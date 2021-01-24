const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = new Stripe("sk_test_L2cKpgElHowzUqPmZ4Ugw5ab00hQWgFuX2");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.post("/api/sbsuscriptions", async (req, res) => {
  const idPaymentMethod = req.body.id;

  const customer = await stripe.customers.create({
    description: "Primer cliente de SABER DONDE",
    email: "jovaslink@gmail.com",
  });
  const idCustomer = customer.id;

  // Attach the payment method to the customer
  try {
    await stripe.paymentMethods.attach(idPaymentMethod, {
      customer: idCustomer,
    });
  } catch (error) {
    return res.status("402").send({ error: { message: error.message } });
  }

  // Change the default invoice settings on the customer to the new payment method
  await stripe.customers.update(idCustomer, {
    invoice_settings: {
      default_payment_method: idPaymentMethod,
    },
  });

  // Create the subscription
  const subscription = await stripe.subscriptions.create({
    customer: idCustomer,
    items: [{ price: "price_1I7AvlKeEEQAvKfhUXADdrFg" }],
    expand: ["latest_invoice.payment_intent"],
  });

  console.log(subscription);

  res.send("Recibido");
});

app.listen(3001, () => {
  console.log("Server on port", 3001);
});
