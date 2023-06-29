import ControlledInput from "@/app/_components/ControlledInput";
import ControlledSelect from "@/app/_components/ControlledSelect";
import ControlledTextArea from "@/app/_components/ControlledTextArea";
import { CreatePatientInputs } from "@/app/patients/page";
import { Controller, useFormContext } from "react-hook-form";

const CreatePatientFormSecondaryTab: React.FC = () => {
  const { control, watch } = useFormContext<CreatePatientInputs>();

  const isTakingMedicine = watch("patient_taking_medicine");
  const isInMedicalTreatment = watch("patient_in_medical_treatment");
  const hasAllergy = watch("patient_has_allergy");
  const hasHeartProblems = watch("patient_has_heart_problems");
  const hasAnesthesiaReaction = watch("patient_has_anesthesia_reaction");
  const hasImportantInformation = watch("patient_has_important_information");

  return (
    <>
      <div id="row-1" className="flex flex-col gap-2">
        <Controller
          name="patient_taking_medicine"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Taking medicine?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
        {!!Number(isTakingMedicine) && (
          <Controller
            name="patient_taking_medicine_description"
            control={control}
            render={({ field }) => (
              <ControlledInput
                {...field}
                label="Which?"
                placeholder="Xanax, Rivotril, Venvanse..."
              />
            )}
          />
        )}
      </div>

      <div id="row-2" className="flex flex-col gap-2">
        <Controller
          name="patient_in_medical_treatment"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="In medicial treatment?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
        {!!Number(isInMedicalTreatment) && (
          <Controller
            name="patient_in_medical_treatment_description"
            control={control}
            render={({ field }) => (
              <ControlledInput
                {...field}
                label="Which?"
                placeholder="Cancer, leuchemia, depression..."
              />
            )}
          />
        )}
      </div>

      <div id="row-3" className="flex flex-col gap-2">
        <Controller
          name="patient_has_allergy"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Has some allergy?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
        {!!Number(hasAllergy) && (
          <Controller
            name="patient_has_allergy_description"
            control={control}
            render={({ field }) => (
              <ControlledInput
                {...field}
                label="Which?"
                placeholder="Urticaria & Angioedema, Rhinitis, Asthma..."
              />
            )}
          />
        )}
      </div>

      <div id="row-4" className="flex flex-col gap-2">
        <Controller
          name="patient_blood_pressure"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Blood pressure"
              options={[
                { value: 0, text: "Normal" },
                { value: 1, text: "High" },
                { value: 2, text: "Low" },
                { value: 3, text: "Controlled with medicine" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-5" className="flex flex-col gap-2">
        <Controller
          name="patient_has_heart_problems"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Has heart problems?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
        {!!Number(hasHeartProblems) && (
          <Controller
            name="patient_has_heart_problems_description"
            control={control}
            render={({ field }) => (
              <ControlledInput
                {...field}
                label="Which?"
                placeholder="Heart attack, failure, Arrhythmia..."
              />
            )}
          />
        )}
      </div>

      <div id="row-6" className="flex flex-col gap-2">
        <Controller
          name="patient_has_rheumatic_fever"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Has/had rheumatic fever?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-7" className="flex flex-col gap-2">
        <Controller
          name="patient_has_diabetes"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Has diabetes?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-8" className="flex flex-col gap-2">
        <Controller
          name="patient_bleeding_level"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Bleeding wound level"
              options={[
                { value: 0, text: "Normal" },
                { value: 1, text: "Excessive" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-9" className="flex flex-col gap-2">
        <Controller
          name="patient_healing_level"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Bleeding wound level"
              options={[
                { value: 0, text: "Normal" },
                { value: 1, text: "Complicated" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-10" className="flex flex-col gap-2">
        <Controller
          name="patient_has_hepatitis"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Has hepatitis?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-11" className="flex flex-col gap-2">
        <Controller
          name="patient_has_breathing_problems"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Has breathing problems?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-12" className="flex flex-col gap-2">
        <Controller
          name="patient_has_gastric_problems"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Has gastric problems?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-13" className="flex flex-col gap-2">
        <Controller
          name="patient_has_joint_problems_or_rheumatism"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Has joint problems or rheumatism?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-14" className="flex flex-col gap-2">
        <Controller
          name="patient_desease_description"
          control={control}
          render={({ field }) => (
            <ControlledTextArea
              {...field}
              label="Desease description"
              rows={5}
            />
          )}
        />
      </div>

      <div id="row-15" className="flex flex-col gap-2">
        <Controller
          name="patient_has_anesthesia_reaction"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Had any anesthesia reaction before?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-16" className="flex flex-col gap-2">
        <Controller
          name="patient_has_anesthesia_reaction"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Had any anesthesia reaction before?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
        {!!Number(hasAnesthesiaReaction) && (
          <Controller
            name="patient_has_anesthesia_reaction_description"
            control={control}
            render={({ field }) => (
              <ControlledInput
                {...field}
                label="Which?"
                placeholder="Nausea, vomiting, dizziness..."
              />
            )}
          />
        )}
      </div>

      <div id="row-17" className="flex flex-col gap-2">
        <Controller
          name="patient_has_teeth_gum_pain"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Has teeth or gum pain?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-18" className="flex flex-col gap-2">
        <Controller
          name="patient_has_gum_bleeding"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Has gum bleeding?"
              options={[
                { value: 0, text: "No" },
                { value: 1, text: "Yes" },
                { value: 2, text: "During hygiene" },
                { value: 3, text: "Sometimes" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-19" className="flex flex-col gap-2">
        <Controller
          name="patient_has_pain_ear_area"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Has pain or popping in the ear area?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-20" className="flex flex-col gap-2">
        <Controller
          name="patient_has_difficulty_opening_mouth"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Has difficulty opening the mouth?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-21" className="flex flex-col gap-2">
        <Controller
          name="patient_grind_clench_teeth"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Grinds or clenches teeth day or night?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-22" className="flex flex-col gap-2">
        <Controller
          name="patient_smokes"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Smoke?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-23" className="flex flex-col gap-2">
        <Controller
          name="patient_alcohol"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Consumes alcoholic beverage?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-24" className="flex flex-col gap-2">
        <Controller
          name="patient_pregnant_lactating"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Pregnant or lactating?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
      </div>

      <div id="row-25" className="flex flex-col gap-2">
        <Controller
          name="patient_has_important_information"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Has some important information not asked?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
        {!!Number(hasImportantInformation) && (
          <Controller
            name="patient_has_important_information_description"
            control={control}
            render={({ field }) => (
              <ControlledInput
                {...field}
                label="Which?"
                placeholder="Some important information..."
              />
            )}
          />
        )}
      </div>

      <div id="row-26" className="flex flex-col gap-2">
        <Controller
          name="patient_bio_confirmation"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Did you, doctor, modified any field in this BIO TAB?"
              options={[
                { value: 1, text: "Yes" },
                { value: 0, text: "No" },
              ]}
            />
          )}
        />
      </div>
    </>
  );
};

export default CreatePatientFormSecondaryTab;
