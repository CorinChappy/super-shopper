import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { attemptLogin } from '../../actions/AuthActions';
import Button from '@material-ui/core/Button';
import './Auth.css'




const mapDispatchToProps = dispatch => ({
        attemptLogin: (username, pwd) => {
            dispatch(attemptLogin(username, pwd))
        }
})

class Auth extends Component {
    state = {
        password: "",
        username: "",
        showPassword: false
    }
    proptypes = {
        username: PropTypes.string
    };

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword})
    }

    handleTextChange = prop => event => {
        this.setState({
            [prop]: event.target.value
        })
    };

    loginClicked = () => {
        this.props.attemptLogin(this.state.username, this.state.password)
        this.setState({
            username: "",
            password: ""
        })
    }


    render() {
        return (

                <Paper className="paperContainer">
                        <Typography variant="title" gutterBottom align="center">
                            {this.props.title}
                        </Typography>
                        <Typography variant="body1" gutterBottom align="center">
                            {this.props.subheading}
                        </Typography>

                        <div>
                            <FormControl style={{width: "100%"}}>
                                <TextField 
                                    //className={classes.margin}
                                    id="username-input-field"
                                    label="Username"
                                    value={this.state.username}
                                    onChange={this.handleTextChange('username')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <AccountCircle/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    />
                            </FormControl>
                            <FormControl style={{width: "100%", marginTop: "20px"}}>
                                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                <Input
                                    id="password-input-field"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={this.handleTextChange('password')}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                        <div className="buttonDiv">
                        <div style={{left: "30%", display:"inline-table", position:"relative", top:"40%"}}>
                        <Button color="primary"  onClick={ ()=> {this.loginClicked()} }>
                            Login
                        </Button>
                        <Button color="primary" disabled={true} onClick={ ()=> {this.loginClicked()} }>
                            Signup
                        </Button>
                        </div>
                        </div>
                </Paper>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Auth);