import React from 'react';
import ReactDOM from 'react-dom/client';
import FormComponent from './components/FormComponent';
import "./styles.css"
import 'font-awesome/css/font-awesome.min.css';

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);
root.render(<FormComponent />);
