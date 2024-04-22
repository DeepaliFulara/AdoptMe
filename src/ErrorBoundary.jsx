import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error,info){
        console.error("ErrorBoundary component caught an error", error, info);
    }

    render(){
        if(this.state.hasError){
            return(
                <h2>
                    There is an error loading this <Link to="/" >click here</Link>{""} to go back to home
                </h2>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;