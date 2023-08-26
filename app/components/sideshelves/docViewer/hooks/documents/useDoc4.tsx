"use client";

import {
  Page,
  Text,
  View,
  Document,
  Image,
  Svg,
  Rect,
  Link,
} from "@react-pdf/renderer";
import React from "react";
import useDoc4Styles from "../styles/useDoc4Styles";
import usePlaceholderImage from "../styles/usePlaceholderImage";
import useCvData from "../useCvData";
import useDocComponents from "./docComponents/useDocComponents";
import { user } from "@/app/hooks/useCvSubSegments";

const useDoc4 = () => {
  const { imgSrc } = usePlaceholderImage();
  const { styles, rectOptions } = useDoc4Styles();
  const { sections, subsegments, theCurrentUser, fontSizeDeterminant } =
    useCvData();
  const { doc4Left, doc4ContactSection, doc4ProfileSection, slBeta } =
    useDocComponents();

  const returnFontSize = (word: string, size: number) =>
    fontSizeDeterminant(word as string, 8, size).fontSize;

  const slBetaMap = (array: string[]) =>
    array.map((section, index) => (
      <React.Fragment key={index}>
        {slBeta(
          {
            sections,
            styles,
            rectOptions: rectOptions("lightPink", true),
            subsegments,
            desiredSection: section,
          },
          { titleStyle: "rightBodyProfileSectionTitleItself" }
        )}
      </React.Fragment>
    ));

  const Doc4 = () => (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          <View
            style={{ ...styles.body, ...styles.column, ...styles.leftColumn }}
          >
            {/**Linked In box view */}
            <View style={styles.leftColumnLinkBox}>
              <Link
                src={theCurrentUser?.personalLink as string}
                style={{
                  ...styles.upperJobTitleTextContainer,
                  ...styles.leftColumnLinkBoxText,
                  fontSize: returnFontSize(
                    theCurrentUser?.prospectiveTitle as string,
                    18
                  ),
                }}
              >
                {theCurrentUser?.personalLink?.toUpperCase()}
              </Link>
            </View>
            {/**Name view */}
            <View style={styles.upperNameSection}>
              <Text
                style={{
                  ...styles.upperNameText,
                  fontSize: returnFontSize(
                    theCurrentUser?.firstname as string,
                    25
                  ),
                }}
              >
                {theCurrentUser?.firstname?.toUpperCase()}{" "}
              </Text>
              <Text
                style={{
                  ...styles.upperNameText,
                  fontSize: returnFontSize(
                    theCurrentUser?.lastname as string,
                    25
                  ),
                }}
              >
                {theCurrentUser?.lastname?.toUpperCase()}
              </Text>
              <Text
                style={{
                  ...styles.upperJobTitleTextContainer,
                  fontSize: returnFontSize(
                    theCurrentUser?.prospectiveTitle as string,
                    15
                  ),
                }}
              >
                {theCurrentUser?.prospectiveTitle?.toUpperCase()}
              </Text>
            </View>{" "}
            {/**User Image view */}
            <View style={styles.imageSection}>
              <Image
                src={
                  theCurrentUser?.image
                    ? (theCurrentUser?.image as string)
                    : imgSrc
                }
                style={styles.imageItself}
              />
            </View>
            {/**User education skills and hobbies view */}
            {["Education", "Certifications", "Skills", "Hobbies"].map(
              (section, index) => (
                <React.Fragment key={index}>
                  {doc4Left(styles, sections, section, subsegments)}
                </React.Fragment>
              )
            )}
          </View>
          <View
            style={{ ...styles.body, ...styles.column, ...styles.rightColumn }}
          >
            {/**User Contact box view */}
            {doc4ContactSection(styles, theCurrentUser as user)}

            {/**User Profile view */}
            {doc4ProfileSection(
              styles,
              theCurrentUser as user,
              rectOptions("lightPink", true)
            )}

            {/**User Work Experience, Languages and Awards view */}
            {slBetaMap(["Work Experience", "Languages", "Awards"])}
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );

  return { Doc4 };
};

export default useDoc4;