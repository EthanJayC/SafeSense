import { View, Text, StyleSheet, Linking } from "react-native";
import React from "react";

const privacyPolicyText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Privacy Policy</Text>
      </Text>
      <Text style={styles.text}>Last updated: March 19, 2024</Text>
      <Text style={styles.text}>
        This Privacy Policy describes Our policies and procedures on the
        collection, use and disclosure of Your information when You use the
        Service and tells You about Your privacy rights and how the law protects
        You.
      </Text>
      <Text style={styles.text}>
        We use Your Personal data to provide and improve the Service. By using
        the Service, You agree to the collection and use of information in
        accordance with this Privacy Policy. This Privacy Policy has been
        created with the help of the{" "}
        <Text
          style={{ color: "blue" }}
          onPress={() =>
            Linking.openURL(
              "https://www.freeprivacypolicy.com/free-privacy-policy-generator/"
            )
          }
        >
          Free Privacy Policy Generator
        </Text>
        .
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
          Interpretation and Definitions
        </Text>
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Interpretation</Text>
      </Text>
      <Text style={styles.text}>
        The words of which the initial letter is capitalized have meanings
        defined under the following conditions. The following definitions shall
        have the same meaning regardless of whether they appear in singular or
        in plural.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Definitions</Text>
      </Text>
      <Text style={styles.text}>For the purposes of this Privacy Policy:</Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>Account</Text> means a unique
        account created for You to access our Service or parts of our Service.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>Application</Text> refers to
        SafeSense, the software program provided by the Company.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>Company</Text> (referred to as
        either "the Company", "We", "Us" or "Our" in this Agreement) refers to
        SafeSense.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>Country</Text> refers to: United
        Kingdom
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>Device</Text> means any device that
        can access the Service such as a computer, a cellphone or a digital
        tablet.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>Personal Data</Text> is any
        information that relates to an identified or identifiable individual.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>Service</Text> refers to the
        Application.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>Service Provider</Text> means any
        natural or legal person who processes the data on behalf of the Company.
        It refers to third-party companies or individuals employed by the
        Company to facilitate the Service, to provide the Service on behalf of
        the Company, to perform services related to the Service or to assist the
        Company in analyzing how the Service is used.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>Usage Data</Text> refers to data
        collected automatically, either generated by the use of the Service or
        from the Service infrastructure itself (for example, the duration of a
        page visit).
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>You</Text> means the individual
        accessing or using the Service, or the company, or other legal entity on
        behalf of which such individual is accessing or using the Service, as
        applicable.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontSize: 10, fontWeight: "bold" }}>
          Collecting and Using Your Personal Data
        </Text>
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontSize: 10, fontWeight: "bold" }}>
          Types of Data Collected
        </Text>
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontSize: 10, fontWeight: "bold" }}>Personal Data</Text>
      </Text>
      <Text style={styles.text}>
        While using Our Service, We may ask You to provide Us with certain
        personally identifiable information that can be used to contact or
        identify You. Personally identifiable information may include, but is
        not limited to:
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>Email address</Text>
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>First name and last name</Text>
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>Usage Data</Text>
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontSize: 10, fontWeight: "bold" }}>Usage Data</Text>
      </Text>
      <Text style={styles.text}>
        Usage Data is collected automatically when using the Service.
      </Text>
      <Text style={styles.text}>
        We may also collect information that Your browser sends whenever You
        visit our Service or when You access the Service by or through a mobile
        device.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontSize: 10, fontWeight: "bold" }}>
          Information Collected while Using the Application
        </Text>
      </Text>
      <Text style={styles.text}>
        While using Our Application, in order to provide features of Our
        Application, We may collect, with Your prior permission:
      </Text>
      <Text style={styles.text}>Information regarding your location</Text>
      <Text style={styles.text}>
        We use this information to provide features of Our Service, to improve
        and customize Our Service. The information may be uploaded to the
        Company's servers and/or a Service Provider's server or it may be simply
        stored on Your device.
      </Text>
      <Text style={styles.text}>
        You can enable or disable access to this information at any time,
        through Your Device settings.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontSize: 10, fontWeight: "bold" }}>
          Use of Your Personal Data
        </Text>
      </Text>
      <Text style={styles.text}>
        The Company may use Personal Data for the following purposes:
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>
          To provide and maintain our Service
        </Text>
        , including to monitor the usage of our Service.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>To manage Your Account:</Text> to
        manage Your registration as a user of the Service. The Personal Data You
        provide can give You access to different functionalities of the Service
        that are available to You as a registered user.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>
          For the performance of a contract:
        </Text>{" "}
        the development, compliance and undertaking of the purchase contract for
        the products, items or services You have purchased or of any other
        contract with Us through the Service.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>To contact You:</Text> To contact
        You by email, telephone calls, SMS, or other equivalent forms of
        electronic communication, such as a mobile application's push
        notifications regarding updates or informative communications related to
        the functionalities, products or contracted services, including the
        security updates, when necessary or reasonable for their implementation.
      </Text>

      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>To manage Your requests:</Text> To
        attend and manage Your requests to Us.
      </Text>
      <Text style={styles.text}>
        We may share Your personal information in the following situations:
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>With other users:</Text> when You
        share personal information or otherwise interact in the public areas
        with other users, such information may be viewed by all users and may be
        publicly distributed outside.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>With Your consent</Text>: We may
        disclose Your personal information for any other purpose with Your
        consent.
      </Text>
      <Text style={styles.header3}>Retention of Your Personal Data</Text>
      <Text style={styles.paragraph}>
        The Company will retain Your Personal Data only for as long as is
        necessary for the purposes set out in this Privacy Policy. We will
        retain and use Your Personal Data to the extent necessary to comply with
        our legal obligations (for example, if we are required to retain your
        data to comply with applicable laws), resolve disputes, and enforce our
        legal agreements and policies.
      </Text>
      <Text style={styles.paragraph}>
        The Company will also retain Usage Data for internal analysis purposes.
        Usage Data is generally retained for a shorter period of time, except
        when this data is used to strengthen the security or to improve the
        functionality of Our Service, or We are legally obligated to retain this
        data for longer time periods.
      </Text>
      <Text style={styles.paragraph}>
        The Company will take all steps reasonably necessary to ensure that Your
        data is treated securely and in accordance with this Privacy Policy and
        no transfer of Your Personal Data will take place to an organization or
        a country unless there are adequate controls in place including the
        security of Your data and other personal information.
      </Text>
      <Text style={styles.header3}>Delete Your Personal Data</Text>
      <Text style={styles.paragraph}>
        You have the right to delete or request that We assist in deleting the
        Personal Data that We have collected about You.
      </Text>
      <Text style={styles.paragraph}>
        Our Service may give You the ability to delete certain information about
        You from within the Service.
      </Text>
      <Text style={styles.paragraph}>
        You may update, amend, or delete Your information at any time by signing
        in to Your Account, if you have one, and visiting the my profile
        settings section that allows you to manage Your personal information.
        You may also contact Us to request access to, correct, or delete any
        personal information that You have provided to Us.
      </Text>
      <Text style={styles.header3}>Security of Your Personal Data</Text>
      <Text style={styles.paragraph}>
        The security of Your Personal Data is important to Us, but remember that
        no method of transmission over the Internet, or method of electronic
        storage is 100% secure. While We strive to use commercially acceptable
        means to protect Your Personal Data, We cannot guarantee its absolute
        security.
      </Text>
      <Text style={styles.header2}>Children's Privacy</Text>
      <Text style={styles.paragraph}>
        Our Service does not address anyone under the age of 13. We do not
        knowingly collect personally identifiable information from anyone under
        the age of 13. If You are a parent or guardian and You are aware that
        Your child has provided Us with Personal Data, please contact Us. If We
        become aware that We have collected Personal Data from anyone under the
        age of 13 without verification of parental consent, We take steps to
        remove that information from Our servers.
      </Text>
      <Text style={styles.paragraph}>
        If We need to rely on consent as a legal basis for processing Your
        information and Your country requires consent from a parent, We may
        require Your parent's consent before We collect and use that
        information.
      </Text>
      <Text style={styles.header2}>Links to Other Websites</Text>
      <Text style={styles.paragraph}>
        Our Service may contain links to other websites that are not operated by
        Us. If You click on a third party link, You will be directed to that
        third party's site. We strongly advise You to review the Privacy Policy
        of every site You visit.
      </Text>
      <Text style={styles.paragraph}>
        We have no control over and assume no responsibility for the content,
        privacy policies or practices of any third party sites or services.
      </Text>
      <Text style={styles.header2}>Changes to this Privacy Policy</Text>
      <Text style={styles.paragraph}>
        We may update Our Privacy Policy from time to time. We will notify You
        of any changes by posting the new Privacy Policy on this page.
      </Text>
      <Text style={styles.paragraph}>
        We will let You know via email and/or a prominent notice on Our Service,
        prior to the change becoming effective and update the "Last updated"
        date at the top of this Privacy Policy.
      </Text>
      <Text style={styles.paragraph}>
        You are advised to review this Privacy Policy periodically for any
        changes. Changes to this Privacy Policy are effective when they are
        posted on this page.
      </Text>
      <Text style={styles.header2}>Contact Us</Text>
      <Text style={styles.paragraph}>
        If you have any questions about this Privacy Policy, You can contact us:
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>By email: c0037305@my.shu.ac.uk</Text>
      </View>
    </View>
  );
};

export default privacyPolicyText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: { fontSize: 8, textAlign: "center" },
  header2: { fontWeight: "bold", fontSize: 10 },
  header3: { fontWeight: "bold", fontSize: 10 },
  header4: { fontWeight: "bold", fontSize: 10 },
  paragraph: { fontSize: 8 },
  list: { paddingLeft: 15 },
  listItem: { fontSize: 8 },
});
