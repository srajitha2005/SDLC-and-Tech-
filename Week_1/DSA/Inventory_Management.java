package DSA;

import java.util.HashMap;

class Product {
    int productId;
    String productName;
    int quantity;
    double price;

    Product(int productId, String productName,
            int quantity, double price) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
    }

    public String toString() {
        return productId + " " + productName +
                " Qty:" + quantity +
                " Price:" + price;
    }
}

public class Inventory_Management {

    public static void main(String[] args) {

        HashMap<Integer, Product> inventory =
                new HashMap<>();

        Product p1 =
                new Product(101,"Laptop",10,50000);

        inventory.put(p1.productId,p1);

        inventory.put(102,
                new Product(102,"Mouse",50,500));

        System.out.println("Inventory:");
        inventory.values().forEach(System.out::println);

        inventory.get(101).quantity = 15;

        inventory.remove(102);

        System.out.println("\nAfter Update/Delete:");
        inventory.values().forEach(System.out::println);
    }
}
