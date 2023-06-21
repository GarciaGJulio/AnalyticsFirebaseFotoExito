import { Button } from "@rneui/base";
import { ScrollView, Text, View } from "react-native";

export const DebugScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Button title="Regresar" onPress={() => navigation.goBack()} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>
            {global.debug} {"\n"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
