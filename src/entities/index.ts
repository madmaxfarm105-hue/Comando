/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: colecoesdeacessorios
 * Interface for ColeesdeAcessrios
 */
export interface ColeesdeAcessrios {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  level?: number;
  /** @wixFieldType text */
  mainColor?: string;
  /** @wixFieldType text */
  collectionName?: string;
  /** @wixFieldType text */
  themeDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  themeBackgroundImage?: string;
}


/**
 * Collection ID: niveis
 * Interface for NveisdoJogo
 */
export interface NveisdoJogo {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  levelNumber?: number;
  /** @wixFieldType text */
  levelName?: string;
  /** @wixFieldType text */
  levelDescription?: string;
  /** @wixFieldType text */
  levelTasks?: string;
  /** @wixFieldType text */
  levelMissions?: string;
  /** @wixFieldType text */
  levelChallenges?: string;
  /** @wixFieldType text */
  levelReward?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  levelImage?: string;
}


/**
 * Collection ID: regras
 * Interface for RegrasdoJogo
 */
export interface RegrasdoJogo {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  ruleTitle?: string;
  /** @wixFieldType text */
  ruleDescription?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  example?: string;
  /** @wixFieldType datetime */
  lastUpdated?: Date | string;
}
