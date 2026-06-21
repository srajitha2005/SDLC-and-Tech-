package Design_Patterns.Strategy_Pattern;

interface PaymentStrategy {
    void pay(int amount);
}

class CreditCardPayment implements PaymentStrategy {

    @Override
    public void pay(int amount) {
        System.out.println("Paid Rs." + amount + " using Credit Card");
    }
}

class PayPalPayment implements PaymentStrategy {

    @Override
    public void pay(int amount) {
        System.out.println("Paid Rs." + amount + " using PayPal");
    }
}

class PaymentContext {

    private PaymentStrategy strategy;

    public PaymentContext(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void executePayment(int amount) {
        strategy.pay(amount);
    }
}

public class Strategy_Pattern {

    public static void main(String[] args) {

        PaymentContext creditCard =
                new PaymentContext(new CreditCardPayment());

        creditCard.executePayment(5000);

        PaymentContext payPal =
                new PaymentContext(new PayPalPayment());

        payPal.executePayment(3000);
    }
}
