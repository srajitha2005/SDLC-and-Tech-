package Design_Patterns.Observer_Pattern;

import java.util.ArrayList;
import java.util.List;

interface Observer {
    void update(double price);
}

class MobileApp implements Observer {

    @Override
    public void update(double price) {
        System.out.println("Mobile App: Stock Price Updated to Rs." + price);
    }
}

class WebApp implements Observer {

    @Override
    public void update(double price) {
        System.out.println("Web App: Stock Price Updated to Rs." + price);
    }
}

class StockMarket {

    private List<Observer> observers = new ArrayList<>();

    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    public void notifyObservers(double price) {
        for (Observer observer : observers) {
            observer.update(price);
        }
    }

    public void setStockPrice(double price) {
        System.out.println("\nStock Price Changed!");
        notifyObservers(price);
    }
}

public class Observer_Pattern {

    public static void main(String[] args) {

        StockMarket stockMarket = new StockMarket();

        Observer mobile = new MobileApp();
        Observer web = new WebApp();

        stockMarket.registerObserver(mobile);
        stockMarket.registerObserver(web);

        stockMarket.setStockPrice(2500);
    }
}