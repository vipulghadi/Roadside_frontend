'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { chatSupportAPI } from '@/api/chatSupportAPI'

const ChatMessage = ({ message, sender, isUser }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
  >
    <div
      className={`max-w-[70%] rounded-lg px-4 py-2 shadow-md ${
        isUser ? 'text-black bg-orange-50' : 'bg-white text-gray-800 border border-gray-200'
      }`}
    >
      <div className="text-xs text-gray-500 mb-1">{sender}</div>
      {message}
    </div>
  </motion.div>
)

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [socket, setSocket] = useState(null)
  const [assistant, setAssistant] = useState(null)
  const [roomId, setRoomId] = useState(null)
  const scrollAreaRef = useRef(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [socket])

  const handleBtnClick = async () => {
    setIsLoading(true)
    setMessages([{ text: "Finding your assistant...", sender: "System", isUser: false }])
    
    try {
      const response = await chatSupportAPI.connectToRoom()
      const { room_id, is_anonymous_user, anonymous_user, chat_assistant_username, first_name, last_name } = response.data
      setAssistant({ username: chat_assistant_username, first_name, last_name })
      setRoomId(room_id)
      
      const ws = new WebSocket(`ws://localhost:8000/ws/chat/${room_id}/`)
      
      ws.onopen = () => {
        console.log('WebSocket connection established')
        setSocket(ws)
        setIsLoading(false)
        setMessages(prev => [...prev, { 
          text: `Hello! I'm ${first_name} ${last_name}, your assistant. How can I help you today?`, 
          sender: chat_assistant_username, 
          isUser: false 
        }])
      }
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.message) {
          setMessages(prev => [...prev, { 
            text: data.message, 
            sender: data.sender, 
            isUser: data.is_user 
          }])
        }
        setIsLoading(false)
      }
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsLoading(false)
      }
      
      ws.onclose = () => {
        console.log('WebSocket connection closed')
        setIsLoading(false)
      }

      // Set anonymous user ID in local storage if applicable
      if (is_anonymous_user && anonymous_user) {
        localStorage.setItem('anonymousUserId', anonymous_user)
      }
    } catch (error) {
      console.error(error)
      setMessages(prev => [...prev, { text: "Sorry, we couldn't connect you to an assistant. Please try again later.", sender: "System", isUser: false }])
      setIsLoading(false)
    }
  }

  const handleSendMessage = () => {
    if (inputMessage.trim() && socket) {
      const newMessage = { text: inputMessage, sender: "You", isUser: true }
      setMessages(prev => [...prev, newMessage])
      setInputMessage('')
      setIsLoading(true)
      
      socket.send(JSON.stringify({ message: inputMessage }))
    }
  }

  const chatbotVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { 
        duration: 0.3
      }
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chatbot"
            variants={chatbotVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="w-[350px] h-[500px] flex flex-col shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-xl font-bold">
                    {assistant ? `Chat with ${assistant.first_name}` : 'TapriWala'}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-orange-600 transition-colors duration-200"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden bg-gray-50">
                <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                  {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg.text} sender={msg.sender} isUser={msg.isUser} />
                  ))}
                  {isLoading && (
                    <div className="flex justify-center items-center h-8">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t bg-white">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }} 
                  className="flex w-full gap-2"
                >
                  <Input
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-grow focus:ring-orange-500 focus:border-orange-500"
                    disabled={!assistant || isLoading}
                  />
                  <Button 
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200"
                    disabled={!assistant || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="chatbutton"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              onClick={() => {
                setIsOpen(true)
                handleBtnClick()
              }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <MessageCircle className="h-6 w-6 mr-2" />
              <span>Need any help?</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}