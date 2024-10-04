import QueryBuilder from '../../builder/QueryBuilder';
import { Teacher } from './teachers.model';

const getAllTeacherFromDB = async (query: Record<string, unknown>) => {
  const teacherQuery = new QueryBuilder(Teacher.find().populate('user'), query)
    .search(['title', 'prefix', 'code'])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await teacherQuery.modelQuery;
  const meta = await teacherQuery.countTotal();
  return {result, meta};
};

export const TeacherServices = {
  getAllTeacherFromDB,
};
