import React from "react";
import {
  confirmPayment,
  createPaymentMethod
} from "@stripe/stripe-react-native";
import { Alert, Keyboard } from "react-native";

const CreatePaymentIntents = async ({
  BookingDetails,
  cardInfo,
  paymentKey,
  totalAmount
  // Assuming this is a state setter function for setting visibility
}) => {
  console.log(
    "Booking details is............",
    // cardInfo,
    paymentKey
    // totalAmount
  );
  Keyboard.dismiss();

  try {
    const { paymentMethod, error } = await createPaymentMethod({
      paymentMethodType: "Card",
      ...cardInfo
    });

    Keyboard.dismiss();

    if (error) {
      // alert("creating payment method");
      throw new Error(`Error creating payment method`);
    }

    const paymentMethodId = paymentMethod.id;

    const paymentIntentResponse = await fetch(
      "https://api.stripe.com/v1/payment_intents",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${paymentKey.stripeSecretKey}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          amount: totalAmount * 100,
          currency: "EUR",
          "automatic_payment_methods[enabled]": "true",
          payment_method: paymentMethodId,
          description: "Payment from Bogathon for new Users.",
          "metadata[name]":
            BookingDetails.first_name + " " + BookingDetails.last_name,
          "metadata[phone]": BookingDetails.phone,
          "metadata[date]": BookingDetails.booking_date,
          "metadata[time_slot]": BookingDetails.time_slot,
          "metadata[num_participants]": BookingDetails.total_participants,
          "metadata[group_name]": BookingDetails.group_name
        }).toString()
      }
    );
    Keyboard.dismiss();

    const paymentIntentData = await paymentIntentResponse.json();

    let confirmPaymentIntent = await confirmPayment(
      paymentIntentData.client_secret,
      { paymentMethodType: "Card" }
    );

    if (!paymentIntentResponse.ok) {
      throw new Error(
        `Failed to create payment intent: ${paymentIntentResponse.statusText}`
      );
    }
    Keyboard.dismiss();

    return { paymentIntentData, confirmPaymentIntent };
  } catch (error) {
    return { error };
  }
};

export default CreatePaymentIntents;
