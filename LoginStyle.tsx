import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Change text color to black
  },
  smallIcon: {
    marginRight: 10,
    marginBottom: 10,
    fontSize: 24,
    color: 'white', // Change icon color to white
  },
  logoContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 260,
    width: 260,
    marginTop: 30,
  },
  text_footer: {
    color: 'white', // Change text color to white
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 3,
    marginTop: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'white', // Change border color to white
    borderRadius: 50,
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    color: 'white', // Change text color to white
  },
  loginContainer: {
    backgroundColor: 'black', // Change background color to black
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center'
  },
  header: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  text_header: {
    color: 'white', // Change text color to white
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: -20,
    textAlign: 'center',
    margin: 20,
  },
  inBut: {
    width: '70%',
    backgroundColor: 'white', // Change background color to white
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
  inBut2: {
    backgroundColor: 'white', // Change background color to white
    height: 65,
    width: 65,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallIcon2: {
    fontSize: 40,
    // marginRight: 10,
  },
  bottomText: {
    color: 'grey', // Change text color to grey
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  radioButton_div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioButton_inner_div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton_title: {
    fontSize: 20,
    color: 'white', // Change text color to white
  },
  radioButton_text: {
    fontSize: 16,
    color: 'black', // Change text color to black
  },
});
export default styles;