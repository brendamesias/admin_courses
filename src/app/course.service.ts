import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private coursesCollection: AngularFirestoreCollection<Course>;

  constructor(
    private readonly afs: AngularFirestore,
    private firestore: AngularFirestore
  ) {
    this.coursesCollection = afs.collection<Course>('courses');
  }

  getCourses() {
    return this.coursesCollection.snapshotChanges();
  }

  createCourse(course: Course) {
    return this.firestore.collection('courses').add(course);
  }

  updateCourse(course: Course) {
    console.log(course)
    delete course.id;
    this.firestore.doc('courses/' + course.id).update(course);
  }

  deleteCourse(courseId: string) {
    this.firestore.doc('courses/' + courseId).delete();
  }

}
