import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useContext } from "react";
import { Context } from "../../context";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
} from "react-native";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  getFirestore,
  updateDoc,
  increment,
} from "firebase/firestore";

import { getDatabase, ref, set } from "firebase/database";

import { fsbase } from "../../firebase/config";

import takeDate from "../../utils/takeDate";

import Comment from "../../components/Comment/Comment";
import { async } from "@firebase/util";

//stateSchema
// const initialState = {
//   comment: "",
// };

export default function CommentsScreen({ navigation, route }) {
  const scrollRef = useRef(null);

  const { postId, image } = route.params;
  const { login, userId } = useSelector((state) => state.auth);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllcomments] = useState([]);
  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  const { currentPath, setCurrentPath } = useContext(Context);

  useEffect(() => {
    fetchComents();
  }, []);

  useEffect(() => {
    setCurrentPath(route.name);
    const onChange = () => {
      const height = Dimensions.get("window").height;
      const width = Dimensions.get("window").width - 16 * 2;
      setdimensions(width);
      setScreenHeight(height);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      setCurrentPath(null);
      dimensionsHandler.remove();
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const fetchComents = async () => {
    try {
      const dbRef = doc(fsbase, "posts", postId);
      onSnapshot(collection(dbRef, "comments"), (docSnap) => {
        const currentComments = docSnap.docs.map((doc) => ({ ...doc.data() }));
        const sortedComments = currentComments.sort(
          (a, b) => b.created < a.created
        );
        setAllcomments(sortedComments);
      });
    } catch (error) {
      console.log(`getAllComents.error`, error);
    }
  };

  const updateCommentCounter = async () => {
    const db = getFirestore();
    await updateDoc(doc(db, "posts", postId), {
      comments: increment(1),
    });
  };

  const sendCommentToServer = async () => {
    const date = new Date().toLocaleDateString();
    const time = new Date()
      .toLocaleTimeString()
      .split(":")
      .splice(0, 2)
      .join(":");
    const created = Date.now().toString();
    const uniqueCommentId = uuidv4();
    try {
      const dbRef = doc(fsbase, "posts", postId);
      await addDoc(collection(dbRef, "comments"), {
        login,
        userId,
        date,
        time,
        commentId: uniqueCommentId,
        created,
        comment,
      });
    } catch (error) {
      console.log("error.sendCommentToServer", error.message);
    }
  };

  const submitForm = async () => {
    await sendCommentToServer();
    await updateCommentCounter();
    setComment("");
    Keyboard.dismiss();
    setKeyboardVisible(false);
    // console.log("Text:", comment.comment, "Date:", takeDate());
    // setComment(initialState);
    // navigation.navigate("PostsScreen");
  };

  return (
    <View style={{ ...styles.container, maxHeight: screenHeight }}>
      <View style={{ width: dimensions }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {!isKeyboardVisible && (
            <>
              <View style={styles.postImgThmb}>
                <Image
                  source={{ uri: image, height: 300, width: "100%" }}
                  style={styles.postImg}
                />
              </View>
            </>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            ref={scrollRef}
            onContentSizeChange={() =>
              scrollRef.current.scrollToEnd({ animated: true })
            }
            style={{ ...styles.commentsList, height: 300 }}
          >
            {allComments &&
              allComments.map(({ comment, login, date, time, commentId }) => (
                <Comment
                  key={commentId}
                  comment={comment}
                  login={login}
                  date={date}
                  time={time}
                />
              ))}

            {/* <View key="1" style={{ ...styles.comment, flexGrow: 1 }}>
            <View style={styles.imgThmb}>
              <Image source={ava1} style={styles.img} />
            </View>
            <View style={{ ...styles.commentThmb, maxWidth: dimensions - 40 }}>
              <Text style={styles.text}>
                Really love your most recent photo. I’ve been trying to capture
                the same thing for a few months and would love some tips!
              </Text>
              <Text style={styles.date}>09 июня, 2020 | 08:40</Text>
            </View>
          </View>
          <View
            key="2"
            style={{
              ...styles.comment,
              ...styles.commentRevers,
            }}
          >
            <View style={{ ...styles.imgThmb, ...styles.imgThmbReverse }}>
              <Image source={ava2} style={styles.img} />
            </View>
            <View
              style={{
                ...styles.commentThmb,
                ...styles.commentThmbRevers,
                maxWidth: dimensions - 40,
              }}
            >
              <Text style={styles.text}>
                A fast 50mm like f1.8 would help with the bokeh. I’ve been using
                primes as they tend to get a bit sharper images.
              </Text>
              <Text style={{ ...styles.date, ...styles.dateReverse }}>
                09 июня, 2020 | 09:14
              </Text>
            </View>
          </View>
          <View
            key="3"
            style={{
              ...styles.comment,
              ...styles.commentRevers,
            }}
          >
            <View style={{ ...styles.imgThmb, ...styles.imgThmbReverse }}>
              <Image source={ava2} style={styles.img} />
            </View>
            <View
              style={{
                ...styles.commentThmb,
                ...styles.commentThmbRevers,
                maxWidth: dimensions - 40,
              }}
            >
              <Text style={styles.text}>
                A fast 50mm like f1.8 would help with the bokeh. I’ve been using
                primes as they tend to get a bit sharper images.
              </Text>
              <Text style={{ ...styles.date, ...styles.dateReverse }}>
                09 июня, 2020 | 09:14
              </Text>
            </View>
          </View> */}
          </ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isKeyboardVisible ? 10 : 0,
              }}
            >
              <View style={{ ...styles.inputThmb }}>
                <TextInput
                  placeholder="Комментировать..."
                  value={comment}
                  style={styles.input}
                  textAlign={"left"}
                  onFocus={() => setKeyboardVisible(true)}
                  onChangeText={(value) => setComment(value)}
                />
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.subBtn}
                  onPress={() => submitForm()}
                >
                  <AntDesign name="arrowup" size={14} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 32,
    paddingBottom: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  postImgThmb: {
    marginBottom: 32,
  },
  postImg: {
    // flexGrow: 1,
    // width: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },
  commentsList: {
    marginBottom: 31,
  },
  comment: {
    flexDirection: "row",
    marginBottom: 24,
    justifyContent: "center",
  },
  commentRevers: { flexDirection: "row-reverse" },
  imgThmb: {
    marginRight: 15,
  },
  imgThmbReverse: {
    marginRight: 0,
    marginLeft: 15,
  },
  img: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  commentThmb: {
    padding: 16,
    borderTopRightRadius: 6,
    // borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  commentThmbRevers: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 6,
  },
  text: {
    marginBottom: 8,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
  date: {
    textAlign: "right",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "400",
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
  },
  dateReverse: {
    textAlign: "left",
  },

  inputThmb: {
    marginTop: "auto",
    position: "relative",
  },
  input: {
    padding: 8,
    paddingLeft: 16,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
  },
  subBtn: {
    position: "absolute",
    right: 8,
    bottom: 6,

    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    borderColor: "transparent",
  },
});
