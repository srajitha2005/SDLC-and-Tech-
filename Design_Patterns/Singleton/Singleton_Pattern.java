package Design_Patterns.Singleton;
class Logger {

    private static Logger instance;

    private Logger() {
        System.out.println("Logger Created");
    }

    public static Logger getInstance() {

        if(instance == null) {
            instance = new Logger();
        }

        return instance;
    }

    public void log(String message) {
        System.out.println(message);
    }
}

public class Singleton_Pattern {

    public static void main(String[] args) {

        Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();

        logger1.log("First Message");
        logger2.log("Second Message");

        System.out.println(
            "Same Object: " + (logger1 == logger2)
        );
    }
}