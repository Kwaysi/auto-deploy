import db from '../../database/models';
import { Repo, RepoCreationAttributes, RepoInstance } from '../../types';

export default class RepoService {
	private readonly model = db.repos;

	constructor() {}

	public async getAll(): Promise<Repo[]> {
		return this.model.findAll();
	}

	public async getById(id: string): Promise<RepoInstance | null> {
		return await this.model.findByPk(id);
	}

	public async create(repo: RepoCreationAttributes): Promise<Repo> {
		return this.model.create(repo);
	}

	public async update(
		id: string,
		repo: RepoCreationAttributes
	): Promise<[number]> {
		return this.model.update(repo, { where: { id } });
	}

	public async delete(id: string): Promise<number> {
		return this.model.destroy({ where: { id } });
	}
}
