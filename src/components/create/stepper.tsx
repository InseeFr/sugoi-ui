import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import React from 'react';

interface Step {
	title: string;
	component: React.ReactNode;
}

interface props {
	steps: Step[];
	functionCreate: () => void;
}

export default function HorizontalLinearStepper({
	steps,
	functionCreate,
}: props) {
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set<number>());

	const isStepSkipped = (step: number) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleFinish = () => {
		functionCreate();
	};

	return (
		<Grid container direction="column" spacing={2}>
			<Grid item>
				<Stepper
					activeStep={activeStep}
					orientation="horizontal"
				>
					{steps.map((step: Step, index) => {
						const stepProps: {
							completed?: boolean;
						} = {};
						const labelProps: {
							optional?: React.ReactNode;
						} = {};
						if (isStepSkipped(index)) {
							stepProps.completed = false;
						}
						return (
							<Step key={step.title} {...stepProps}>
								<StepLabel {...labelProps}>
									{step.title}
								</StepLabel>
							</Step>
						);
					})}
				</Stepper>
			</Grid>

			<Grid item>{steps[activeStep].component}</Grid>
			<Grid item>
				<div style={{ float: 'right' }}>
					<Button
						disabled={activeStep === 0}
						onClick={handleBack}
					>
						Retour
					</Button>
					{activeStep !== steps.length - 1 ? (
						<Button
							variant="contained"
							color="primary"
							onClick={handleNext}
						>
							Suivant
						</Button>
					) : null}
					{activeStep === steps.length - 1 ? (
						<Button
							variant="contained"
							color="primary"
							onClick={handleFinish}
						>
							Créer
						</Button>
					) : null}
				</div>
			</Grid>
		</Grid>
	);
}
