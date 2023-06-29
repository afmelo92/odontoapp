import React from "react";

type ActionButtonsContainerProps = {
  onCancel?: () => void;
  submitLabel: string;
};

const ActionButtonsContainer: React.FC<ActionButtonsContainerProps> = ({
  onCancel = null,
  submitLabel = "",
}) => {
  return (
    <div
      id="actions-container"
      className={`${onCancel ? "grid-cols-4 gap-2" : "grid-cols-1"} grid pb-4`}
    >
      {onCancel && (
        <button
          onClick={onCancel}
          className="col-span-1 py-3 rounded-xl border-2 border-gray-400 text-gray-500 font-medium"
        >
          Cancel
        </button>
      )}
      <button
        type="submit"
        className={`${
          onCancel ? "col-span-3" : ""
        } bg-blue-500 hover:bg-blue-700 transition-colors py-3 rounded-xl text-white font-medium`}
      >
        {submitLabel}
      </button>
    </div>
  );
};

export default ActionButtonsContainer;
