import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useSnackbar } from 'notistack';
interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error: string;
}

interface props {
	error: string;
}

const ShowSnackBar = ({ error }: props) => {
	const { enqueueSnackbar } = useSnackbar();
	enqueueSnackbar(error, {
		variant: 'error',
		persist: false,
	});
	return <h1>Oops something went wrong :(</h1>;
};

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
		error: '',
	};

	public static getDerivedStateFromError(error: Error): State {
		// Update state so the next render will show the fallback UI.

		return { hasError: true, error: error.message };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return <ShowSnackBar error={this.state.error} />;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
