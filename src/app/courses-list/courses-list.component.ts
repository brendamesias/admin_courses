import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { Subscription } from 'rxjs';
export interface CourseId extends Course { id: string; }

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {

  editCache: { [key: string]: { edit: boolean; data: Course } } = {};
  courses: Course[] = [];
  editId: string | null = null;
  getCourses: Subscription;

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.getCourses = this.courseService.getCourses().subscribe(data => {
      this.courses = data.map(e => {
        const data = e.payload.doc.data() as Course;
        const id = e.payload.doc.id;

        return { id, ...data };
      });

      this.updateEditCache();
    });
  }

  ngOnDestroy() {
    this.getCourses.unsubscribe();
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  saveEdit(id: string): void {
    this.courseService.updateCourse(this.editCache[id].data, id);
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

  delete(id: string) {
    this.courseService.deleteCourse(id);
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    const course = {
      courseName: '',
      email: '',
      password: '',
      webName: '',
      state: 'toDo',
      courseType: 'frontend',
      url: ''
    };

    this.courseService.createCourse(course);
  }

}
