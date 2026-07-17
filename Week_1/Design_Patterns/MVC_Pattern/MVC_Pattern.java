package Design_Patterns.MVC_Pattern;

class Student {

    private String name;
    private int id;
    private String grade;

    public Student(String name, int id, String grade) {
        this.name = name;
        this.id = id;
        this.grade = grade;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public String getGrade() {
        return grade;
    }

    public void setName(String name) {
        this.name = name;
    }
}

class StudentView {

    public void displayStudentDetails(Student student) {

        System.out.println("Student Details");
        System.out.println("---------------");
        System.out.println("Name  : " + student.getName());
        System.out.println("ID    : " + student.getId());
        System.out.println("Grade : " + student.getGrade());
    }
}

class StudentController {

    private Student model;
    private StudentView view;

    public StudentController(Student model,
                             StudentView view) {
        this.model = model;
        this.view = view;
    }

    public void setStudentName(String name) {
        model.setName(name);
    }

    public void updateView() {
        view.displayStudentDetails(model);
    }
}

public class MVC_Pattern {

    public static void main(String[] args) {

        Student model =
                new Student("Rajitha", 101, "A");

        StudentView view =
                new StudentView();

        StudentController controller =
                new StudentController(model, view);

        controller.updateView();

        System.out.println("\nAfter Updating Name:");

        controller.setStudentName("Rajitha S");

        controller.updateView();
    }
}
