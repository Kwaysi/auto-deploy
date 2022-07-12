import db from '../../database/models';
import { Deploy, DeployCreationAttributes, DeployInstance } from '../../types';

export class DeployService {
	private readonly model = db.deploys;

	constructor() {}

	public async getAll(repoId: string): Promise<Deploy[]> {
		return this.model.findAll({ where: { repoId } });
	}

	public async getById(
		id: string,
		logs: boolean = false
	): Promise<DeployInstance | null> {
		return await this.model.findByPk(id, {
			...(!logs && { attributes: { exclude: ['logs'] } })
		});
	}

	public async create(deploy: DeployCreationAttributes): Promise<Deploy> {
		return this.model.create(deploy);
	}

	public async update(
		id: string,
		deploy: DeployCreationAttributes
	): Promise<[number]> {
		return this.model.update(deploy, { where: { id } });
	}

	public async delete(id: string): Promise<number> {
		return this.model.destroy({ where: { id } });
	}
}
