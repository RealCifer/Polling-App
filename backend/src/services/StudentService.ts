type Student = {
  socketId: string;
  name: string;
};

class StudentService {
  private students: Map<string, Student> = new Map();

  addStudent(socketId: string, name: string) {
    this.students.set(socketId, { socketId, name });
    console.log("Student joined:", name);
  }

  removeStudent(socketId: string) {
    this.students.delete(socketId);
  }

  getAllStudents() {
    return Array.from(this.students.values());
  }
}

export const studentService = new StudentService();
