import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLatLngToStore1751420412495 implements MigrationInterface {
    name = 'AddLatLngToStore1751420412495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_f94c72515c300083297fac24fc\` ON \`stores\``);
        await queryRunner.query(`ALTER TABLE \`stores\` DROP COLUMN \`location\``);
        await queryRunner.query(`ALTER TABLE \`stores\` ADD \`lat\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`stores\` ADD \`lng\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` CHANGE \`team_one\` \`team_one\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` CHANGE \`team_two\` \`team_two\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` CHANGE \`etc\` \`etc\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`stores\` CHANGE \`description\` \`description\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stores\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` CHANGE \`etc\` \`etc\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` CHANGE \`team_two\` \`team_two\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`broadcasts\` CHANGE \`team_one\` \`team_one\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`stores\` DROP COLUMN \`lng\``);
        await queryRunner.query(`ALTER TABLE \`stores\` DROP COLUMN \`lat\``);
        await queryRunner.query(`ALTER TABLE \`stores\` ADD \`location\` point NOT NULL`);
        await queryRunner.query(`CREATE SPATIAL INDEX \`IDX_f94c72515c300083297fac24fc\` ON \`stores\` (\`location\`)`);
    }

}
