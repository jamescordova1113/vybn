import React from 'react';
import Modal from "react-native-modal";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
const stripe = require("stripe-client")(
  "pk_test_0WXs0SQRWkyrk18oAQ7YFXbZ00P9EluclG"
);

async function CreateToken(card, exp_year, exp_month, cvv) {
  console.log("hello");
  return stripe
    .createToken({
      card: {
        number: card,
        exp_month,
        exp_year,
        cvc: cvv
      }
    })
    .then(token => {
      return token;
    });
}

export default function ModalComponent(props) {
  const [card, setCard] = React.useState("");
  const [expiryYear, setExpiryYear] = React.useState("");
  const [expiryMonth, setExpiryMonth] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [err, setError] = React.useState(false);
  const [customLoading, setCustomLoading] = React.useState(false);

  const [
    makePayment,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(MAKE_PAYMENT);
  const handlePayment = async () => {
    setError(false);
    setCustomLoading(true);
    if (card == "" || expiryMonth == "" || expiryYear == "" || cvv == "") {
      setError("All fields are required");
      return;
    }
    let token;

    token = await CreateToken(card, expiryYear, expiryMonth, cvv);
    console.log("token");
    console.log(token);
    if (token.id) {
      setCustomLoading(false);
      await makePayment({ variables: { token: token.id } });
      props.showPaymentModal(false);
      props.refetch();
    } else {
      setCustomLoading(false);
      setError(token.error.message);
    }
  };

  if (mutationLoading || customLoading) {
    return (
      <View>
        <Modal
          isVisible={true}
          onBackdropPress={() => props.showPaymentModal(false)}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={{ backgroundColor: "white", margin: 10 }}>
              <View style={{ padding: 10 }}>
                <Text>Loading</Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View>
      <Modal
        isVisible={true}
        onBackdropPress={() => props.showPaymentModal(false)}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ backgroundColor: "white", margin: 10 }}>
            <View style={{ padding: 10 }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {err && (
                  <Text style={{ color: "red", padding: 10 }}>{err}</Text>
                )}
                {mutationError && (
                  <Text style={{ color: "red", padding: 10 }}>
                    {mutationError.message}
                  </Text>
                )}
              </View>
              <TextInput
                keyboardType="numeric"
                value={card}
                placeholder="Card Number(ex: 1234567890123456)"
                style={{
                  borderWidth: 1,
                  borderColor: "#bbb",
                  height: 40,
                  marginBottom: 10,
                  paddingLeft: 10
                }}
                onChangeText={text => setCard(text)}
              />
              <TextInput
                keyboardType="numeric"
                value={expiryMonth}
                placeholder="Expire Month(ex: 03)"
                style={{
                  borderWidth: 1,
                  borderColor: "#bbb",
                  height: 40,
                  marginBottom: 10,
                  paddingLeft: 10
                }}
                onChangeText={text => setExpiryMonth(text)}
              />
              <TextInput
                keyboardType="numeric"
                value={expiryYear}
                placeholder="Expire Year(ex: 2020)"
                style={{
                  borderWidth: 1,
                  borderColor: "#bbb",
                  height: 40,
                  marginBottom: 10,
                  paddingLeft: 10
                }}
                onChangeText={text => setExpiryYear(text)}
              />
              <TextInput
                keyboardType="numeric"
                value={cvv}
                placeholder="CVV(ex: 123)"
                style={{
                  borderWidth: 1,
                  borderColor: "#bbb",
                  height: 40,
                  paddingLeft: 10
                }}
                onChangeText={text => setCvv(text)}
              />
              <TouchableOpacity onPress={() => handlePayment()}>
                <View
                  style={{
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 10,
                    backgroundColor: "#333",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    Continue
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const MAKE_PAYMENT = gql`
  mutation($token: String!) {
    makePayment(token: $token)
  }
`;
