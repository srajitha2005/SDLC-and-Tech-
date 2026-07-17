

interface PaymentProcessor {
    void processPayment(double amount);
}

class PayPalGateway {

    public void makePayment(double amount) {
        System.out.println("PayPal Payment Processed: Rs." + amount);
    }
}

class PayPalAdapter implements PaymentProcessor {

    private PayPalGateway payPalGateway;

    public PayPalAdapter(PayPalGateway payPalGateway) {
        this.payPalGateway = payPalGateway;
    }

    @Override
    public void processPayment(double amount) {
        payPalGateway.makePayment(amount);
    }
}

public class Adapter_Pattern {

    public static void main(String[] args) {

        PayPalGateway payPalGateway =
                new PayPalGateway();

        PaymentProcessor paymentProcessor =
                new PayPalAdapter(payPalGateway);

        paymentProcessor.processPayment(5000);
    }
}
