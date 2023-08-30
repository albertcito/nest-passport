import { BaseEntity, In, Not } from 'typeorm';

export default class RemoveDBNoUsed {
  static async run<Model>(
    model: typeof BaseEntity,
    where: Partial<Model>,
    pkManyName: keyof Model,
    ids: (string | number)[],
  ) {
    return model.delete({ ...where, [pkManyName]: Not(In(ids)) });
  }
}
