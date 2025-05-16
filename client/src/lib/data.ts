// Import learning modules and integration steps data
import { learningModules, LearningModule, Lesson } from "@assets/learningModules";
import { integrationStepsGermany, IntegrationStep, StepCategory as IntegrationStepCategory, OfficialStatus, StepDifficulty, SubTask } from "@assets/integrationSteps";

// Export the imported types for use in other components
export type { LearningModule, Lesson, IntegrationStep, IntegrationStepCategory, OfficialStatus, StepDifficulty, SubTask };

// ========== LEARNING MODULES ==========

/**
 * Get all learning modules
 */
export function getAllLearningModules(): LearningModule[] {
  return learningModules;
}

/**
 * Get a learning module by ID
 */
export function getLearningModuleById(id: string): LearningModule | null {
  return learningModules.find(module => module.id === id) || null;
}

/**
 * Get random learning modules (for recommendations)
 */
export function getRandomLearningModules(count: number = 2): LearningModule[] {
  // In a production app, we would have more logic for recommendations
  // For now, we'll just return the first 'count' modules
  return learningModules.slice(0, count);
}

/**
 * Get lessons for a specific module
 */
export function getLessons(moduleId: string): Lesson[] {
  const module = getLearningModuleById(moduleId);
  return module ? module.lessons : [];
}

// ========== INTEGRATION STEPS ==========

/**
 * Get all integration steps
 */
export function getAllIntegrationSteps(): IntegrationStep[] {
  return integrationStepsGermany;
}

/**
 * Get integration steps by category
 */
export function getStepsByCategory(category: IntegrationStepCategory): IntegrationStep[] {
  return integrationStepsGermany.filter(step => step.category === category);
}

/**
 * Get upcoming integration steps
 */
export function getUpcomingIntegrationSteps(count: number = 2): IntegrationStep[] {
  // In a production app, this would be personalized based on user progress
  // For now, we'll return the first 'count' steps
  return integrationStepsGermany.slice(0, count);
}

/**
 * Get step prerequisites 
 */
export function getStepPrerequisites(stepId: string): IntegrationStep[] {
  const step = integrationStepsGermany.find(s => s.id === stepId);
  if (!step || !step.prerequisites || step.prerequisites.length === 0) {
    return [];
  }
  
  return integrationStepsGermany.filter(s => step.prerequisites?.includes(s.id)) || [];
}
