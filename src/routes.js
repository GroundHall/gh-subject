import Handlers from './handlers';

import {
  SubjectModel,
  SubjectModelRequired
} from './db/model';


const routes = [
  {
    method: 'GET',
    path: '/subjects',
    handler: Handlers.getAllSubjects
  },
  {
    method: 'GET',
    path: '/subjects/{subjectId}',
    handler: Handlers.getSubject
  },
  {
    method: 'POST',
    path: '/subjects',
    handler: Handlers.createSubject,
    config: {
      validate: {
        payload: SubjectModelRequired
      }
    }
  },
  {
    method: 'PUT',
    path: '/subjects/{subjectId}',
    handler: Handlers.putSubject,
    config: {
      validate: {
        payload: SubjectModelRequired
      }
    }
  },
  {
    method: 'PATCH',
    path: '/subjects/{subjectId}',
    handler: Handlers.patchSubject,
    config: {
      validate: {
        payload: SubjectModel
      }
    }
  },
  {
    method: 'DELETE',
    path: '/subjects/{subjectId}',
    handler: Handlers.deleteSubject
  }
];

export default routes;
