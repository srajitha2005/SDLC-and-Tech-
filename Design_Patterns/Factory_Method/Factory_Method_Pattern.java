package Design_Patterns.Factory_Method;

interface Document {
    void open();
}

class WordDocument implements Document {

    public void open() {
        System.out.println("Word Document Opened");
    }
}

class PdfDocument implements Document {

    public void open() {
        System.out.println("PDF Document Opened");
    }
}

abstract class DocumentFactory {
    abstract Document createDocument();
}

class WordFactory extends DocumentFactory {

    public Document createDocument() {
        return new WordDocument();
    }
}

class PdfFactory extends DocumentFactory {

    public Document createDocument() {
        return new PdfDocument();
    }
}

public class Factory_Method_Pattern {

    public static void main(String[] args) {

        DocumentFactory wordFactory =
                new WordFactory();

        Document wordDoc =
                wordFactory.createDocument();

        wordDoc.open();

        DocumentFactory pdfFactory =
                new PdfFactory();

        Document pdfDoc =
                pdfFactory.createDocument();

        pdfDoc.open();
    }
}
