import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeDeleteToEntityRelations1751018962976 implements MigrationInterface {
    name = 'AddCascadeDeleteToEntityRelations1751018962976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stores_images\` DROP FOREIGN KEY \`fk_storeimage_store\``);
        await queryRunner.query(`ALTER TABLE \`favorites\` DROP FOREIGN KEY \`fk_favorite_store\``);
        await queryRunner.query(`ALTER TABLE \`favorites\` DROP FOREIGN KEY \`fk_favorite_user\``);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` DROP FOREIGN KEY \`fk_broadcast_store\``);
        await queryRunner.query(`ALTER TABLE \`stores\` DROP FOREIGN KEY \`fk_store_user\``);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` CHANGE \`team_one\` \`team_one\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` CHANGE \`team_two\` \`team_two\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` CHANGE \`etc\` \`etc\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`stores\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`stores_images\` ADD CONSTRAINT \`fk_storeimage_store\` FOREIGN KEY (\`store_id\`) REFERENCES \`stores\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favorites\` ADD CONSTRAINT \`fk_favorite_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favorites\` ADD CONSTRAINT \`fk_favorite_store\` FOREIGN KEY (\`store_id\`) REFERENCES \`stores\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` ADD CONSTRAINT \`fk_broadcast_store\` FOREIGN KEY (\`store_id\`) REFERENCES \`stores\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`stores\` ADD CONSTRAINT \`fk_store_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stores\` DROP FOREIGN KEY \`fk_store_user\``);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` DROP FOREIGN KEY \`fk_broadcast_store\``);
        await queryRunner.query(`ALTER TABLE \`favorites\` DROP FOREIGN KEY \`fk_favorite_store\``);
        await queryRunner.query(`ALTER TABLE \`favorites\` DROP FOREIGN KEY \`fk_favorite_user\``);
        await queryRunner.query(`ALTER TABLE \`stores_images\` DROP FOREIGN KEY \`fk_storeimage_store\``);
        await queryRunner.query(`ALTER TABLE \`stores\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT ''NULL''`);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` CHANGE \`etc\` \`etc\` text NULL DEFAULT ''NULL''`);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` CHANGE \`team_two\` \`team_two\` varchar(255) NULL DEFAULT ''NULL''`);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` CHANGE \`team_one\` \`team_one\` varchar(255) NULL DEFAULT ''NULL''`);
        await queryRunner.query(`ALTER TABLE \`stores\` ADD CONSTRAINT \`fk_store_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` ADD CONSTRAINT \`fk_broadcast_store\` FOREIGN KEY (\`store_id\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favorites\` ADD CONSTRAINT \`fk_favorite_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favorites\` ADD CONSTRAINT \`fk_favorite_store\` FOREIGN KEY (\`store_id\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`stores_images\` ADD CONSTRAINT \`fk_storeimage_store\` FOREIGN KEY (\`store_id\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
