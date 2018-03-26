import {Component} from 'react';
import {
    Button,
    Container,
    List,
    Image,
    Grid,
    Message,
    Rail,
    Sticky,
    Input,
    Segment
} from 'semantic-ui-react';
import HeaderMenu from '../components/HeaderMenu';
import web3 from '../ethereum/web3';
import PrivateKeyModal from '../components/EnterPrivateKeyModal';
import GuideModal from '../components/GuideModal';
import Head from 'next/head';
import Account from '../lib/Account';
import ContactList from '../components/ContactList';
import Chat from '../components/Chat';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, contactList: [], messages: [], selectedContact: "" };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.account = new Account();
    }

    componentDidMount() {
        console.log(window.localStorage);
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.checkForPrivateKey();
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
      
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    joinIntoContract = () => {
        this.account.joinContract();
    }

    checkForPrivateKey() {
        if (typeof(Storage) !== "undefined") {
            var privateKey = window.localStorage.privateKey;
            var firstTimeUse = window.localStorage.firstTimeUse;
            if (firstTimeUse) {
                if (privateKey == undefined) {
                    //this.setState({modalOpen: true});
                } else {
                    this.account.setPrivateKey(privateKey);
                }
            }
        }
    }

    render() {
        var account = this.account;

        var listHeight = this.state.height - 100;
        return (
            <Container>
                <PrivateKeyModal account={account} />
                <HeaderMenu account={account} />
                <GuideModal />
            <Grid column={2} style={{paddingTop: 80}}>
                <Grid.Row stretched>
                    <Grid.Column width={6} style={{height: listHeight + "px", float: 'left'}}>
                        <ContactList height={listHeight} account={account}/>
                    </Grid.Column>
                    <Grid.Column width={10} style={{height: listHeight + "px", overflow: 'auto', float: 'left'}}>
                        <Chat height={listHeight} account={account}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {/* </div> */}
            </Container>
        );
    }
}

export default Index;