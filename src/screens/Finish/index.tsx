import { Text, View } from 'react-native';

import { useAccountForm } from '../../hooks/useAccountForm';

export function Finish() {
  const { accountFormData } = useAccountForm();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Name: {accountFormData.name}</Text>
      <Text>Email: {accountFormData.email}</Text>
      <Text>Date of Birth: {accountFormData.birth}</Text>
      <Text>Phone Number: {accountFormData.phone}</Text>
      <Text>Password: {accountFormData.password}</Text>
      <Text>Confirmation: {accountFormData.passwordConfirmation}</Text>
    </View>
  );
}
