import {
  AutomationCustomIOType,
  AutomationIOType,
  AutomationStepType,
  AutomationTriggerSchema,
  AutomationTriggerStepId,
  AutomationEventType,
  Row,
  SearchFilters,
} from "@budibase/types"

export const definition: AutomationTriggerSchema = {
  name: "Row Updated",
  event: AutomationEventType.ROW_UPDATE,
  icon: "Refresh",
  tagline: "Row is updated in {{inputs.enriched.table.name}}",
  description: "Fired when a row is updated in your database",
  stepId: AutomationTriggerStepId.ROW_UPDATED,
  inputs: {},
  schema: {
    inputs: {
      properties: {
        tableId: {
          type: AutomationIOType.STRING,
          customType: AutomationCustomIOType.TABLE,
          title: "Table",
        },
        filters: {
          type: AutomationIOType.OBJECT,
          customType: AutomationCustomIOType.TRIGGER_FILTER,
          title: "Filtering",
        },
      },
      required: ["tableId"],
    },
    outputs: {
      properties: {
        oldRow: {
          type: AutomationIOType.OBJECT,
          customType: AutomationCustomIOType.ROW,
          description: "The row that was updated",
          title: "Old Row",
        },
        row: {
          type: AutomationIOType.OBJECT,
          customType: AutomationCustomIOType.ROW,
          description: "The row before it was updated",
          title: "Row",
        },
        id: {
          type: AutomationIOType.STRING,
          description: "Row ID - can be used for updating",
        },
        revision: {
          type: AutomationIOType.STRING,
          description: "Revision of row",
        },
      },
      required: ["row", "id"],
    },
  },
  type: AutomationStepType.TRIGGER,
}

export type RowUpdatedTriggerInputs = {
  tableId: string
  filters?: SearchFilters
}

export type RowUpdatedTriggerOutputs = {
  row: Row
  id: string
  revision?: string
}
