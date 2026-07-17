package Design_Patterns.Decorator_Pattern;

interface Notifier {
    void send();
}

class EmailNotifier implements Notifier {

    @Override
    public void send() {
        System.out.println("Email Notification Sent");
    }
}

abstract class NotifierDecorator implements Notifier {

    protected Notifier notifier;

    public NotifierDecorator(Notifier notifier) {
        this.notifier = notifier;
    }
}

class SMSNotifierDecorator extends NotifierDecorator {

    public SMSNotifierDecorator(Notifier notifier) {
        super(notifier);
    }

    @Override
    public void send() {
        notifier.send();
        System.out.println("SMS Notification Sent");
    }
}

class SlackNotifierDecorator extends NotifierDecorator {

    public SlackNotifierDecorator(Notifier notifier) {
        super(notifier);
    }

    @Override
    public void send() {
        notifier.send();
        System.out.println("Slack Notification Sent");
    }
}

public class Decorator_Pattern {

    public static void main(String[] args) {

        Notifier notifier =
                new SlackNotifierDecorator(
                        new SMSNotifierDecorator(
                                new EmailNotifier()));

        notifier.send();
    }
}
