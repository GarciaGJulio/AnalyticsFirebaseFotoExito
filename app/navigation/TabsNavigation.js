import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Icon } from "@rneui/base";
import Prices_Review from "../screens/review/Prices_Review";
import Rack_Review from "../screens/review/Rack_Review";
import theme from "../theme/theme";
import Briefcase_branch_review from "../screens/review/Briefcase_branch_review";
import Promos_Review from "../screens/review/Promos_Review";
import { DataContext } from "../context/DataProvider";
import { WithOutData } from "../screens/review/WithoutData";

const TabArr = [
  {
    route: "Portafolio",
    label: "Portafolio",
    type: "octicon",
    icon: "briefcase",
    component: Briefcase_branch_review,
    color: theme.colors.modernaGreen,
  },
  {
    route: "Precio",
    label: "Precio",
    type: "font-awesome",
    icon: "dollar",
    component: Prices_Review,
    color: theme.colors.modernaGreen,
  },
  {
    route: "Percha",
    label: "Percha",
    type: "material-community",
    icon: "library-shelves",
    component: Rack_Review,
    color: theme.colors.modernaGreen,
  },
  {
    route: "Promociones",
    label: "Promociones",
    type: "material-icons",
    icon: "local-offer",
    component: Promos_Review,
    color: theme.colors.modernaGreen,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, param, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);
  const storedParam = useRef(null);

  useEffect(() => {
    // if (storedParam.current === null) {
    //   storedParam.current = param;
    //   //console.log('Stored Param:', storedParam.current);
    // }

    if (focused) {
      // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
      textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
    }
  }, [focused]);

  const handlePress = () => {
    // onPress(storedParam.current);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.65 }]}
    >
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: item.color, borderRadius: 16 },
          ]}
        />
        <View style={[styles.btn, { backgroundColor: focused }]}>
          <Icon type={item.type} name={item.icon} color={"white"} />
          <Animatable.View ref={textViewRef}>
            {focused && (
              <Text
                style={{
                  color: "white",
                  paddingHorizontal: 5,
                }}
              >
                {item.label}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const TabsNavigation = ({ route }) => {
  const { datosCompartidos } = useContext(DataContext);
  //const { branch } = route.params;
  //console.log("DATOS DE NAVEGACION A EVALUAR: -- - - ", datosCompartidos);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50,
          paddingHorizontal: 10,
          position: "absolute",
          // borderRadius: 16,
          backgroundColor: theme.colors.modernaRed,
        },
      }}
    >
      {TabArr.map((item, index) => {
        switch (item.route) {
          case "Portafolio":
            if (
              datosCompartidos.id_portafolio_auditoria !== null &&
              datosCompartidos.id_portafolio_auditoria !== "null"
            ) {
              return (
                <Tab.Screen
                  key={index}
                  name={item.route}
                  component={Briefcase_branch_review}
                  options={{
                    tabBarShowLabel: false,
                    tabBarButton: (props) => (
                      <TabButton
                        {...props}
                        item={item}
                      //param={branch}
                      />
                    ),
                  }}
                />
              );
            }
          case "Precio":
            if (
              datosCompartidos.id_preciador !== null &&
              datosCompartidos.id_preciador !== "null"
            ) {
              return (
                <Tab.Screen
                  key={index}
                  name={item.route}
                  component={Prices_Review}
                  options={{
                    tabBarShowLabel: false,
                    tabBarButton: (props) => (
                      <TabButton
                        {...props}
                        item={item}
                      //param={branch}
                      />
                    ),
                  }}
                />
              );
            }
            break;
          case "Percha":
            if (
              datosCompartidos.id_percha !== null &&
              datosCompartidos.id_percha !== "null"
            ) {
              return (
                <Tab.Screen
                  key={index}
                  name={item.route}
                  component={Rack_Review}
                  options={{
                    tabBarShowLabel: false,
                    tabBarButton: (props) => (
                      <TabButton
                        {...props}
                        item={item}
                      //param={branch}
                      />
                    ),
                  }}
                />
              );
            }
            break;
          case "Promociones":
            if (
              datosCompartidos.id_promocion !== null &&
              datosCompartidos.id_promocion !== "null"
            ) {
              return (
                <Tab.Screen
                  key={index}
                  name={item.route}
                  component={Promos_Review}
                  options={{
                    tabBarShowLabel: false,
                    tabBarButton: (props) => (
                      <TabButton
                        {...props}
                        item={item}
                      //param={branch}
                      />
                    ),
                  }}
                />
              );
            }
            break;

        }
      })}
      {
        ((datosCompartidos.id_promocion == null ||
          datosCompartidos.id_promocion == "null") &&
          (datosCompartidos.id_percha == null ||
            datosCompartidos.id_percha == "null") &&
          (datosCompartidos.id_preciador == null ||
            datosCompartidos.id_preciador == "null") &&
          (datosCompartidos.id_portafolio_auditoria == null ||
            datosCompartidos.id_portafolio_auditoria == "null")) && <Tab.Screen
          key={1}
          name={"Sin Variables"}
          component={WithOutData}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => (
              <TabButton
                {...props}
                item={{
                  route: "Sin Variables",
                  label: "Sin Variables",
                  type: "material-icons",
                  icon: "local-offer",
                  component: WithOutData,
                  color: theme.colors.modernaGreen,
                }}
              //param={branch}
              />
            ),
          }}
        />
      }

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 16,
  },
});
