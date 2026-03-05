void main() {
  // Using var (type is inferred)
  var studentName = "Arjun";
  var age = 20;

  // Using final (value is set once at runtime)
  final double marks = 85.5;

  // Using const (compile-time constant)
  const bool isPassed = true;

  // Displaying the values
  print("Student Details");
  print("----------------");
  print("Name       : $studentName");
  print("Age        : $age");
  print("Marks      : $marks");
  print("Pass Status: $isPassed");
}