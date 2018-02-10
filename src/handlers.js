import Boom from 'boom';
import dateformat from 'dateformat';
import env from './env.config';
import r from './db/config';
import {
  ReplyPromiseResponse
} from './decorators';

class Handlers {
  @ReplyPromiseResponse
  static async getAllSubjects() {
    return r.table(env.DB_TABLE_NAME);
  }

  @ReplyPromiseResponse
  static async getSubject(request) {
    const { subjectId } = request.params;
    return r.table(env.DB_TABLE_NAME).get(subjectId);
  }

  @ReplyPromiseResponse
  static async createSubject(request) {
    const { payload } = request;
    return r.table(env.DB_TABLE_NAME).insert(
      r.expr(payload).merge({
        createdAt: r.now()
      }),
      // This tells rethinkdb that changes should be return
      {returnChanges: true}
    )
  }

  @ReplyPromiseResponse
  static async putSubject(request) {
    const { subjectId } = request.params;
    const { payload } = request;
    payload.id = subjectId;
    return r.table(env.DB_TABLE_NAME)
      .get(subjectId)
      .replace(payload, {returnChanges: true})
  }

  @ReplyPromiseResponse
  static async patchSubject(request) {
    const { subjectId } = request.params;
    const { payload } = request;
    payload.id = subjectId;
    return r.table(env.DB_TABLE_NAME)
    .get(subjectId)
    .update(payload, {returnChanges: true})
  }

  @ReplyPromiseResponse
  static async deleteSubject(request) {
    const { subjectId } = request.params;
    return r.table(env.DB_TABLE_NAME)
      .get(subjectId)
      .delete({returnChanges: true})
  }
}

export default Handlers;
