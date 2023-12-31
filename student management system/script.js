
  function addCourse(event) {
    event.preventDefault();

    const courseName = document.getElementById('courseName').value;
    const gradingScale = document.getElementById('gradingScale').value;

    const course = {
      courseName: courseName,
      gradingScale: gradingScale
    };

    data.courses.push(course); // Yeni kursu courses dizisine ekleme
    displayCourses(); // Dersleri ekranda gösterme

    // Dersleri dropdown menüsüne ekleme
    updateCourseDropdown();
    updateStudentCourseDropdown(); // Öğrenci Ders dropdown'ını güncelleme
  }




  function updateCourseDropdown() {
    const selectCourse = document.getElementById('courseName');
    selectCourse.innerHTML = '';

    data.courses.forEach(course => {
      const option = document.createElement('option');
      option.value = course.courseName;
      option.textContent = course.courseName;
      selectCourse.appendChild(option);
    });
  }



  function updateStudentCourseDropdown() {
    const selectStudentCourse = document.getElementById('studentCourse');
    selectStudentCourse.innerHTML = '';

    data.courses.forEach(course => {
      const option = document.createElement('option');
      option.value = course.courseName;
      option.textContent = course.courseName;
      selectStudentCourse.appendChild(option);
    });
  }






  function addStudent(event) {
    event.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const studentSurname = document.getElementById('studentSurname').value;
    const midtermGrade = document.getElementById('midtermGrade').value;
    const finalGrade = document.getElementById('finalGrade').value;
    const studentCourse = document.getElementById('studentCourse').value;

    const student = {
      studentId: studentId,
      name: studentName,
      surname: studentSurname,
      midtermGrade: midtermGrade,
      finalGrade: finalGrade,
      course: studentCourse
    };

    data.students.push(student); // Öğrenciyi students veri yapısına ekle
    displayStudents(); // Öğrenci listesini güncelle
  }





      
      // midtermi %40 finali %60 alarak final letter
function calculateGrade(midtermGrade, finalGrade) {
    const average = (midtermGrade * 0.4) + (finalGrade * 0.6);
      
    let gradeLetter;
      
    if (average >= 90) {
      gradeLetter = 'A';
    } else if (average >= 80) {
      gradeLetter = 'B';
    } else if (average >= 70) {
      gradeLetter = 'C';
    } else if (average >= 60) {
      gradeLetter = 'D';
    } else {
      gradeLetter = 'F';
    }
      
    return {
      gradeLetter: gradeLetter,
      grade: average
    };
}
      
      

      function showUpdateForm(student) {
        const updateFormDiv = document.getElementById('update-form');
      
        // Formun içeriğini temizle
        updateFormDiv.innerHTML = '';
      
        // Güncelleme formunu oluşturma
        const form = document.createElement('form');
      
        // İsim
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Name:';
        form.appendChild(nameLabel);
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = student.name;
        form.appendChild(nameInput);
      
        // Soyisim
        const surnameLabel = document.createElement('label');
        surnameLabel.textContent = 'Surname:';
        form.appendChild(surnameLabel);
        const surnameInput = document.createElement('input');
        surnameInput.type = 'text';
        surnameInput.value = student.surname;
        form.appendChild(surnameInput);
      
        // Midterm Notu
        const midtermGradeLabel = document.createElement('label');
        midtermGradeLabel.textContent = 'Midterm Grade:';
        form.appendChild(midtermGradeLabel);
        const midtermGradeInput = document.createElement('input');
        midtermGradeInput.type = 'number';
        midtermGradeInput.value = student.midtermGrade;
        form.appendChild(midtermGradeInput);
      
        // Final Notu
        const finalGradeLabel = document.createElement('label');
        finalGradeLabel.textContent = 'Final Grade:';
        form.appendChild(finalGradeLabel);
        const finalGradeInput = document.createElement('input');
        finalGradeInput.type = 'number';
        finalGradeInput.value = student.finalGrade;
        form.appendChild(finalGradeInput);
      
        // Ders
        const courseLabel = document.createElement('label');
        courseLabel.textContent = 'Course:';
        form.appendChild(courseLabel);
        const courseInput = document.createElement('select');
        data.courses.forEach(course => {
          const option = document.createElement('option');
          option.value = course.courseName;
          option.textContent = course.courseName;
          courseInput.appendChild(option);
        });
        courseInput.value = student.course;
        form.appendChild(courseInput);
      
        // Güncelleme butonu
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.type = 'button'; 
        updateButton.onclick = function() {
          const updatedStudent = {
            studentId: student.studentId,
            name: nameInput.value,
            surname: surnameInput.value,
            midtermGrade: midtermGradeInput.value,
            finalGrade: finalGradeInput.value,
            course: courseInput.value
          };
          updateStudent(updatedStudent);
        };
        form.appendChild(updateButton);
      
        updateFormDiv.appendChild(form);
      }
      
      
      

      

      function updateStudent(updatedStudent) {
        const studentIndex = data.students.findIndex(student => student.studentId === updatedStudent.studentId);
        if (studentIndex !== -1) {
          // Güncellenecek öğrencinin bilgilerini al
          const existingStudent = data.students[studentIndex];
      
          // Yeni bilgileri atama
          existingStudent.name = updatedStudent.name;
          existingStudent.surname = updatedStudent.surname;
          existingStudent.midtermGrade = updatedStudent.midtermGrade;
          existingStudent.finalGrade = updatedStudent.finalGrade;
          existingStudent.course = updatedStudent.course;
      
          // Öğrenci listesini güncelle
          data.students[studentIndex] = existingStudent;
          displayStudents();
        } else {
          console.log('Öğrenci bulunamadi!');
        }
      }
      
      
      function deleteCourse(courseName) {
        // Kursu bul
        const courseIndex = data.courses.findIndex(course => course.courseName === courseName);
      
        // Eğer kurs bulunduysa, listeden kaldır
        if (courseIndex !== -1) {
          data.courses.splice(courseIndex, 1);
          // Silme işleminden sonra güncel verilerle tabloyu yeniden göster
          displayCourses();
        } else {
          console.log('Kurs bulunamadi!');
        }
      }

      function deleteStudent(studentId) {
        const studentIndex = data.students.findIndex(student => student.studentId === studentId);
        if (studentIndex !== -1) {
          data.students.splice(studentIndex, 1);
          displayStudents();
        } else {
          console.log('Öğrenci bulunamadi!');
        }
      }
      
      



    // Ders bilgilerini güncelleme fonksiyonu
    function updateCourse(updatedCourse) {
      const courseIndex = data.courses.findIndex(course => course.courseName === updatedCourse.courseName);
      if (courseIndex !== -1) {
        data.courses[courseIndex] = { ...data.courses[courseIndex], ...updatedCourse };
    
        displayCourses();
        updateCourseDropdown();
        updateStudentCourseDropdown();
      } else {
        console.log('Ders bulunamadi!');
      }
    }
    


    // Dersleri gösterme fonksiyonu
    function displayCourses() {
      const displayCoursesDiv = document.getElementById('display-courses');
      displayCoursesDiv.innerHTML = '';
    
      const table = document.createElement('table');
      const headerRow = table.insertRow();
      ['Course Name', 'Grading Scale', 'Actions'].forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
      });
    
      data.courses.forEach(course => {
        const row = table.insertRow();
        ['courseName', 'gradingScale'].forEach(fieldName => {
          const cell = row.insertCell();
          cell.textContent = course[fieldName] || '-';
        });
    
        const actionCell = row.insertCell();
    
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = function() {
          showUpdateCourseForm(course);
        };
        actionCell.appendChild(updateButton);
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
          deleteCourse(course.courseName); // dersi sil
        };
        actionCell.appendChild(deleteButton);
      });
    
      displayCoursesDiv.appendChild(table);
    }
    
    

    // Öğrencileri gösterme fonksiyonu
    function displayStudents() {
      const displayStudentsDiv = document.getElementById('display-students');
      displayStudentsDiv.innerHTML = '';
    
      const table = document.createElement('table');
      const headerRow = table.insertRow();
      ['Student ID', 'Name', 'Surname', 'Midterm Grade', 'Final Grade', 'Course', 'Grade Letter', 'Grade', 'Actions'].forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
      });
    
      data.students.forEach(student => {
        const row = table.insertRow();
        ['studentId', 'name', 'surname', 'midtermGrade', 'finalGrade', 'course'].forEach(fieldName => {
          const cell = row.insertCell();
          cell.textContent = student[fieldName] || '-';
        });
    
        const gradeCell = row.insertCell();
        const gradeInfo = calculateGrade(student.midtermGrade, student.finalGrade);
        gradeCell.textContent = gradeInfo.gradeLetter || '-';
    
        const gradeValueCell = row.insertCell();
        gradeValueCell.textContent = gradeInfo.grade || '-';
    
        const actionCell = row.insertCell();
    
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = function() {
          showUpdateForm(student);
        };
        actionCell.appendChild(updateButton);
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
          deleteStudent(student.studentId);
        };
        actionCell.appendChild(deleteButton);
      });
    
      displayStudentsDiv.appendChild(table);
    }
    

    
    


    // Ders bilgilerini güncelleme formunu gösterme fonksiyonu
    function showUpdateCourseForm(course) {
      const updateFormDiv = document.getElementById('update-form');
      updateFormDiv.innerHTML = '';
    
      const form = document.createElement('form');
    
      const nameLabel = document.createElement('label');
      nameLabel.textContent = 'Course Name:';
      form.appendChild(nameLabel);
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.value = course.courseName;
      form.appendChild(nameInput);
    
      const scaleLabel = document.createElement('label');
      scaleLabel.textContent = 'Grading Scale:';
      form.appendChild(scaleLabel);
      const scaleInput = document.createElement('input');
      scaleInput.type = 'number';
      scaleInput.value = course.gradingScale;
      form.appendChild(scaleInput);
    
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.onclick = function(event) {
        event.preventDefault();
        const updatedCourse = {
          courseName: nameInput.value,
          gradingScale: scaleInput.value,
        };
        updateCourse(updatedCourse);
      };
      form.appendChild(updateButton);
    
      updateFormDiv.appendChild(form);
    }
    

    
    // bir öğrenciyi search et
    function searchStudentAndDisplayCourses() {
      const searchInput = document.getElementById('searchInput');
      const studentName = searchInput.value.trim(); // Arama metnini al ve başındaki ve sonundaki boşlukları kaldır
    
      if (studentName !== '') {
        const foundStudent = data.students.find(
          student => student.name.toLowerCase() === studentName.toLowerCase()
        );
    
        if (foundStudent) {
          displayStudentCourses(foundStudent); // Öğrencinin derslerini göster
        } else {
          const studentInfo = document.getElementById('student-info');
          studentInfo.innerHTML = 'Öğrenci bulunamadi.';
          const displayStudentCoursesDiv = document.getElementById('display-student-courses');
          displayStudentCoursesDiv.innerHTML = ''; // Öğrenci bulunamadı mesajı için önceki dersler tablosunu temizle
        }
      } else {
        alert('Lütfen bir öğrenci adi girin.');
      }
    }
    
    
    
    function displayStudentCourses(student) {
      const studentInfoDiv = document.getElementById('student-info');
      studentInfoDiv.innerHTML = ''; // Önceki içeriği temizle
    
      const heading = document.createElement('h2');
      heading.textContent = `${student.name} ${student.surname}`;
      studentInfoDiv.appendChild(heading);
    
      const table = document.createElement('table');
      table.classList.add('student-courses-table');
    
      const headerRow = table.insertRow();
      ['Course', 'Midterm Grade', 'Final Grade'].forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
      });
    
      const studentCourses = data.students.filter(course => course.studentId === student.studentId);
      studentCourses.forEach(course => {
        const row = table.insertRow();
        ['course', 'midtermGrade', 'finalGrade'].forEach(fieldName => {
          const cell = row.insertCell();
          cell.textContent = course[fieldName] || '-';
        });
      });
    
      studentInfoDiv.appendChild(table);
    }
    
    
    
  

      
    let data = {
      students: [
        {
          studentId: 1,
          name: 'John',
          surname: 'Doe',
          midtermGrade: 85,
          finalGrade: 80,
          course: 'Mathematics'
        },
        {
          studentId: 2,
          name: 'Alice',
          surname: 'Smith',
          midtermGrade: 75,
          finalGrade: 60,
          course: 'Physics'
        },
        {
        studentId: 2,
        name: 'Alice',
        surname: 'Smith',
        midtermGrade: 50,
        finalGrade: 80,
        course: 'Biology'
        },
        {
        studentId: 30,
        name: 'Emma',
        surname: 'Johnson',
        midtermGrade: 90,
        finalGrade: 85,
        course: 'Biology'
        },,,,,,,,,,,,,,,,,
        {
        studentId: 2,
        name: 'Ahmet',
        surname: 'Yücel',
        midtermGrade: 55,
        finalGrade: 70,
        course: 'History'
        },
        {
        studentId: 2,
        name: 'Faruk',
        surname: 'Yilmaz',
        midtermGrade: 40,
        finalGrade: 80,
        course: 'Computer Science'
        },
            
        
      ],
      courses: [
        {
          courseName: 'Mathematics',
          gradingScale: 10
        },
        {
          courseName: 'Physics',
          gradingScale: 10
        },
        
        {
          courseName: 'Biology',
          gradingScale: 10
        },
        {
          courseName: 'Chemistry',
          gradingScale: 10
        },
        {
          courseName: 'History',
          gradingScale: 10
        },
        {
          courseName: 'Literature',
          gradingScale: 10
        },
        {
          courseName: 'Computer Science',
          gradingScale: 10
        }
        
      ]
    };
    
    
      
      
