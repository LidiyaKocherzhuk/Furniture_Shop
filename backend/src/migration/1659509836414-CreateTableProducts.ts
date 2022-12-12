import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableBeds1659509836414 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT PRIMARY KEY AUTO_INCREMENT,
                model VARCHAR(250) NOT NULL,
                slats VARCHAR(250) DEFAULT('фанера'),
                decor VARCHAR(250), 
                price VARCHAR(250) NOT NULL,
                headboardHeight VARCHAR(250),
                sidewallsHeight VARCHAR(250),
                dimensionsOfTheProduct VARCHAR(250),
                legs VARCHAR(250),
                mechanism VARCHAR(250),
                isNovelty VARCHAR(250),
                isPopular VARCHAR(250),
                type VARCHAR(250) NOT NULL,
                materials VARCHAR(250),
                anotherDetails VARCHAR(250),
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS products');
    }
}
