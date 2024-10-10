export type EmailTemplateType = {
    country: string; // The country name, e.g., "Ukraine"
    default_image_text: string; // Text description for the default image
    default_image_value: string; // Value or description for the default image
    image_name: string; // Name of the image, e.g., "success"
    image_type: string; // Type of the image, e.g., "success"
    image_value: string; // Encoded image value (Base64 or similar)
    notification_body: string; // The body of the notification, potentially with placeholders
    notification_name: string; // The name of the notification, e.g., "file_processed"
    notification_title: string; // The title of the notification, potentially with placeholders
    notification_type: string; // Type of notification, e.g., "monolit_notification" or "composit_notification"
    signature_body: string; // The body of the signature, potentially containing HTML content
  };