import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { Observable } from 'rxjs';
export interface CourseId extends Course { id: string; }

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  editCache: { [key: string]: { edit: boolean; data: Course } } = {};
  courses: Course[] = [];
  editId: string | null = null;

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(data => {
      console.log(data);
      this.courses = data.map(e => {
        console.log(e.payload.doc.data());
        console.log(e.payload.doc.id);
        const data = e.payload.doc.data() as Course;
        const id = e.payload.doc.id;

        return { id, ...data };
      });

      this.updateEditCache();
    });
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  saveEdit(id: string): void {
    // const index = this.courses.findIndex(item => item.id === id);
    this.update(this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  cancelEdit(id: string): void {
    const index = this.courses.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.courses[index] },
      edit: false
    };
  }

  updateEditCache(): void {
    this.courses.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  update(couse: Course) {
    this.courseService.updateCourse(couse);
  }

  delete(id: string) {
    this.courseService.deleteCourse(id);
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    const course = {
      courseNumber: 'string',
      paymentOption: 'string',
      courseAmount: 2,
      extraInfo: 'string',
    };

    this.courseService.createCourse(course);
  }

}
