import { Injectable } from '@angular/core';
import { Order } from '../data/order';
import { environment } from '../environment/environment';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private serviceID = environment.emailServiceID;
  private templateID = environment.emailTemplateID;
  private userID = environment.emailUserID;
  private replyTo = environment.replyToEmail;
  

    sendOrderEmail(order: Order): Promise<EmailJSResponseStatus> {
      const orderDetails = this.generateOrderMessage(order);
  
      const templateParams = {
        to_name: 'Dorea catering and events ',
        from_name: order.name,
        message: orderDetails,
        reply_to: order.email,
        email: this.replyTo,
        phone: order.phoneNumber
      };
  
      return emailjs.send(this.serviceID, this.templateID, templateParams, this.userID);
    }
  
    private generateOrderMessage(order: Order): string {
      let message = 'Order Summary:\n\n';
  
      order.cartItems.forEach(item => {
        message += `• ${item.product.name} (${item.quantity}x)\n`;
      });
  
      message += '\n';
      message += `Name: ${order.name}\n`;
      message += `Phone: ${order.phoneNumber}\n`;
      message += `Place: ${order.place}\n`;
      message += `Event: ${order.eventType}\n`;
      message += `Date: ${order.eventDate}\n`;
      message += `Time: ${order.eventTime}\n`;
      message += `Schedule: ${order.scheduleType}\n`;
      message += `Venue: ${order.venue}\n`;
      message += `Person Count: ${order.personCount}\n`;
      message += `Note: ${order.orderNote || 'N/A'}\n`;
  
      return message;
    }
}
