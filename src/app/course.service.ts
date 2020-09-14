import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Course } from './course.model';
import { AuthFirebaseService } from './providers/auth/auth-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private authService: AuthFirebaseService,
    private firestore: AngularFirestore
  ) {
  }

  getCourses() {
    return this.firestore.collection('users').doc(this.authService.userId).collection('courses').snapshotChanges();
  }

  createCourse(course: Course) {
    return this.firestore.collection('users').doc(this.authService.userId).collection('courses').add(course);
  }

  updateCourse(course: Course, id: string) {
    delete course.id;
    this.firestore
    .collection('users')
    .doc(this.authService.userId)
    .collection('courses')
    .doc(id).update(course);
  }

  deleteCourse(courseId: string) {
    this.firestore
    .collection('users')
    .doc(this.authService.userId)
    .collection('courses')
    .doc(courseId).delete();
  }

}
