import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, CheckCircle2 } from "lucide-react";

const initialNotifications = [
  { id: '1', message: 'New order received', datetime: '2023-06-15T10:30:00', seen: false },
  { id: '2', message: 'Payment processed successfully', datetime: '2023-06-14T15:45:00', seen: true },
  { id: '3', message: 'Customer left a review', datetime: '2023-06-13T09:00:00', seen: false },
  { id: '4', message: 'Inventory low for product X', datetime: '2023-06-12T11:20:00', seen: true },
  { id: '5', message: 'New feature available: Analytics Dashboard', datetime: '2023-06-11T16:00:00', seen: false },
];

export default function VendorNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const markAsSeen = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, seen: true } : notification
      )
    );
  };

  const markAllAsSeen = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, seen: true }))
    );
  };

  return (
    <div className="container w-full p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Notifications</CardTitle>
          <Bell className="h-6 w-6 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline" className="text-sm">
              {notifications.filter(n => !n.seen).length} new
            </Badge>
            <Button variant="outline" size="sm" onClick={markAllAsSeen}>
              Mark all as seen
            </Button>
          </div>
          <ScrollArea className="h-[400px] pr-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`mb-4 p-3 rounded-lg transition-colors ${
                  notification.seen ? 'bg-gray-100' : 'bg-blue-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <p className={`text-sm ${notification.seen ? 'text-gray-600' : 'text-blue-600 font-semibold'}`}>
                    {notification.message}
                  </p>
                  {!notification.seen && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => markAsSeen(notification.id)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="sr-only">Mark as seen</span>
                    </Button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDateTime(notification.datetime)}
                </p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
