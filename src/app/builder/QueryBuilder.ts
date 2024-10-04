import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  constructor(
    public modelQuery: Query<T[], T>,
    public query: Record<string, unknown>,
  ) {}

  search(searchableFields: string[]) {
    if (this.query?.searchTerm) {
      const searchTerm = this.query.searchTerm;
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => {
          return { [field]: { $regex: searchTerm, $options: 'i' } };
        }),
      } as FilterQuery<T>);
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((field) => delete queryObj[field]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sortQ = this.query?.sort || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sortQ as string);
    return this;
  }
  paginate(){
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
  fields(){
    const fields = (this.query?.fields as string)?.split(',').join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async countTotal(){
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const total = await this.modelQuery.model.countDocuments();
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    }
  }
}

export default QueryBuilder;
