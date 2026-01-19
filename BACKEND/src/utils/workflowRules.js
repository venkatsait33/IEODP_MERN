export const WORKFLOW_RULES = {
  SUBMITTED: {
    allowedRoles: ["LEADERSHIP"],
    allowedActions: ["LEADERSHIP_REVIEW"],
    nextStatus: "FORWARDED_TO_MANAGEMENT",
  },

  FORWARDED_TO_MANAGEMENT: {
    allowedRoles: ["MANAGEMENT"],
    allowedActions: ["MANAGEMENT_ACTION"],
    nextStatus: "ACTION_TAKEN",
  },

  ACTION_TAKEN: {
    allowedRoles: ["AUDITORS"],
    allowedActions: [
      "AUDITOR_APPROVED",
      "AUDITOR_REJECTED",
      "AUDITOR_REVERIFY",
    ],
  },

  REVERIFY: {
    allowedRoles: ["OPERATIONS", "LEADERSHIP", "MANAGEMENT"],
    allowedActions: ["REVERIFY_RESPONSE"],
    nextStatus: "FORWARDED_TO_MANAGEMENT",
  },
};
