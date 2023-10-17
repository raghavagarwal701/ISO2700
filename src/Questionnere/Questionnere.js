import React, { useState, useMemo, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from "./Questionnere.module.css";
import Question from "../Questions/Question";
import jsPDF from "jspdf";
import "jspdf-autotable";



const Questionnere = (props) => {
  const [updatedData, setUpdatedData] = useState({});
  const questionnaire = useMemo(
    () => ({
      essential1: [
        {
          num: 0,
          name: "1. Policy and Governance: Information security policies and governance:",
          question:
            'How does your organization approach information security policy, employee suitability verification, and access management?',
          options: [
            [
              "We need formal information security policies, adequate employee suitability checks, and defined access controls, which must be addressed.",
              0,
            ],
            [
              "We have some policies and checks, but they may need to be consistently updated, and employee suitability verification is moderate.",
              1,
            ],
            [
              "Our information security policies are well-defined, but we must conduct employee suitability verification or have adequate access controls.",
              1,
            ],
            [
              "We have well-defined information security policies, conduct thorough background checks, implement robust access controls, and continuously update them. ",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          num: 1,
          name: "1. Policy and Governance: Information security policies and governance:",
          question:
            "How does your organization ensure the security of day-to-day operations, integrate security into the development lifecycle, and manage mobile device and teleworking security?",
          options: [
            [
              "We have limited operational procedures, inadequate security integration, and insufficient mobile device and teleworking security measures, with no updates.",
              0,
            ],
            [
              "We have some security measures in place, but they may need to consistently address all aspects of operations, development, and mobile device security, and updates are infrequent.",
              1,
            ],
            [
              "Our operational procedures are comprehensive, but security integration into development, mobile device, and teleworking security measures is not consistently addressed or updated.",
              1,
            ],
            [
              "We have comprehensive operational procedures, integrate security into the development lifecycle, maintain strict control over mobile devices and teleworking, and continuously update security measures.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          num: 2,
          name: "1. Policy and Governance: Information security policies and governance:",
          question:
            "How does your organization manage information security policy, access control, and the security of mobile devices and teleworking?",
          options: [
            [
              "We need formal information security policies, effective access controls, and adequate security measures for mobile devices and teleworking, and no updates are performed.",
              0,
            ],
            [
              "We have some policies and controls, but they may need to update or adequately secure mobile devices and teleworking arrangements consistently.",
              1,
            ],
            [
              "Our information security policies are well-defined, but we need practical access controls or adequate security measures for mobile devices and teleworking, and updates are infrequent.",
              1,
            ],
            [
              "We have a well-defined information security policy, robust access controls, comprehensive mobile device and teleworking security measures, and continuous updates.",
              2,
            ],
          ],
          choosedOption: null,
        },
      ],
      essential2: [
        {
          num: 3,
          name: "2. Human Resource Security: Employee and contractor management:",
          question:
            "How does your organization handle candidate suitability verification, employee awareness of security responsibilities, and information security responsibilities during employee termination or role changes?",
          options: [
            [
              "We must consistently conduct verification checks, provide adequate awareness training, or have clear information security responsibilities during transitions.",
              0,
            ],
            [
              "We have some verification checks and awareness training but may not consistently enforce information security responsibilities during transitions.",
              1,
            ],
            [
              "Our verification checks and awareness training are infrequent, and we need more clarity on information security responsibilities during transitions.",
              1,
            ],
            [
              "We conduct comprehensive background verification checks for candidates, provide thorough awareness training during employment, and define and communicate information security responsibilities during transitions.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          num: 4,
          name: "2. Human Resource Security: Employee and contractor management:",
          question:
            "How does your organization approach pre-employment checks, awareness of security responsibilities, and promoting safe online behavior among employees and contractors?",
          options: [
            [
              "We do not consistently conduct verification checks, provide adequate awareness training, or offer guidance on safe online behavior.",
              0,
            ],
            [
              "We have some verification checks and awareness training. However, they may not fully align with legal requirements or consistently promote safe online behavior.",
              1,
            ],
            [
              "Our verification checks and awareness training are infrequent, and our guidance on safe online behavior needs to be improved.",
              1,
            ],
            [
              "We conduct comprehensive background verification checks for candidates, provide annual awareness training during employment, and offer guidance on safe online behavior.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          num: 5,
          name: "2. Human Resource Security: Employee and contractor management:",
          question:
            "What measures does your organization have in place for pre-employment checks, ensuring awareness of security responsibilities, and promoting safe online behavior among employees and contractors?",
          options: [
            [
              "We do not consistently conduct verification checks, provide adequate awareness training, or offer guidance on safe online behavior.",
              0,
            ],
            [
              "We have some verification checks and awareness training. However, they may not fully align with legal requirements or consistently promote safe online behavior.",
              1,
            ],
            [
              "Our verification checks and awareness training are infrequent, and our guidance on safe online behavior needs to be improved.",
              1,
            ],
            [
              "We conduct comprehensive background verification checks for candidates, provide annual awareness training during employment, and offer guidance on safe online behavior to promote security.",
              2,
            ],
          ],
          choosedOption: null,
        },
      ],
      essential3: [
        {
          num: 6,
          name: "3. Asset and Access Management: Asset responsibility and access control:",
          question:
            "How does your organization manage its Information and Communication Technology (ICT) equipment, including auditing and registration?",
          options: [
            [
              "We do not have an ICT equipment register, and auditing is not performed.",
              0,
            ],
            [
              "We have an ICT equipment register but do not regularly audit it.",
              1,
            ],
            [
              "We maintain an ICT equipment register but do not audit it, and we update it irregularly.",
              1,
            ],
            [
              "We maintain an ICT equipment register and regularly audit it.",
              1,
            ],
          ],
          choosedOption: null,
        },
        {
          num: 7,
          name: "3. Asset and Access Management: Asset responsibility and access control:",
          question:
            "What measures are in place to ensure that users acknowledge their security responsibilities before accessing systems, and do you seek legal advice on their wording?",
          options: [
            [
              "We do not use logon banners or require users to acknowledge security responsibilities.",
              0,
            ],
            [
              "Logon banners are used, but we have not sought legal advice on their wording.",
              1,
            ],
            [
              "We use logon banners but do not seek legal advice; the wording could be more explicit.",
              1,
            ],
            [
              "Systems have logon banners requiring users to accept security responsibilities, and we seek legal advice on their wording.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          num: 8,
          name: "3. Asset and Access Management: Asset responsibility and access control:",
          question:
            "How does your organization classify ICT equipment based on the sensitivity or classification of the data it processes, and are they consistently aligned?",
          options: [
            [
              "ICT equipment is not classified based on data sensitivity.",
              0,
            ],
            [
              "We classify ICT equipment, but the alignment with data sensitivity varies depending on circumstances.",
              1,
            ],
            [
              "We classify ICT equipment but may need to align it with data sensitivity consistently.",
              1,
            ],
            [
              "ICT equipment is classified based on the highest sensitivity or classification of data approved for processing and consistently aligned.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          num: 9,
          name: "3. Asset and Access Management: Asset responsibility and access control:",
          question:
            "What measures are in place to prevent unauthorized disclosure, modification, removal, or destruction of information stored on media? Do you have media management policies and audit the removable media register?",
          options: [
            [
              "We do not have media management policies or audit the removable media register.",
              0,
            ],
            [
              "We have media management policies but do not regularly audit the removable media register.",
              1,
            ],
            [
              "We have media policies but do not regularly audit the removable media register",
              1,
            ],
            [
              "We have media management policies, regularly audit a removable media register, and have measures to prevent unauthorized incidents. ",
              2,
            ],
          ],
          choosedOption: null,
        },
      ],
      essential4: [
        {
          num: 10,
          name: "4. Integrated Information Security Framework: Protection, Controls, and Operations:",
          question:
            "How does your organization prevent unauthorized physical access, damage, and interference to information and information processing facilities?",
          options: [
            [
              "Our physical security measures are inadequate, and we need significant enhancements.",
              0,
            ],
            [
              "Our physical security practices must be improved in several critical areas, posing significant risks.",
              0,
            ],
            [
              "We have some security measures, but some areas need improvement.",
              1,
            ],
            [
              "We have robust security measures that effectively prevent physical access and damage.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          num: 11,
          name: "4. Integrated Information Security Framework: Protection, Controls, and Operations:",
          question:
            "How does your organization protect equipment from loss, damage, theft, or compromise, ensuring uninterrupted operations?",
          options: [
            [
              "Our equipment protection measures are insufficient, leading to frequent disruptions.",
              0,
            ],
            [
              "Our equipment protection practices need to be improved, and we frequently experience disruptions.",
              0,
            ],
            [
              "We protect our equipment, but there might be room for improvement.",
              1,
            ],
            [
              "We have comprehensive measures to protect equipment, and disruptions are rare.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          num: 12,
          name: "4. Integrated Information Security Framework: Protection, Controls, and Operations:",
          question:
            "How does your organization handle the physical security of ICT equipment and media, ensuring security when not in use?",
          options: [
            [
              "Our ICT equipment and media security practices are lax, posing risks to our organization.",
              0,
            ],
            [
              "Our ICT equipment and media security measures must be improved, and we often face security risks.",
              0,
            ],
            [
              "We secure ICT equipment and media, but our practices may have gaps.",
              1,
            ],
            [
              "We have strict policies and practices to secure ICT equipment and media.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          num: 13,
          name: "4. Integrated Information Security Framework: Protection, Controls, and Operations:",
          question:
            "How does your organization ensure correct and secure operations of information processing facilities and protect against malware?",
          options: [
            [
              "Our operational procedures must be better defined or documented, and our malware protection measures must be revised. ",
              0,
            ],
            [
              "Our operational security practices must be improved in several critical areas, posing significant risks.",
              0,
            ],
            [
              "We have operational procedures and malware protection but recognize areas for improvement.",
              1,
            ],
            [
              "We have well-defined operational procedures, responsibilities, and robust malware protection measures.",
              2,
            ],
          ],
          choosedOption: null,
        },
      ],
      essential5: [
        {
          num: 14,
          name: "5. System Development and Management: Secure System Lifecycle:",
          question:
            "How does your organization ensure the security of information systems throughout its entire lifecycle, including the requirements for designs that provide services over public networks?",
          options: [
            [
              "We do not use evaluated products or conduct any security assessment, and our systems are vulnerable to various threats.",
              0,
            ],
            [
              "Our organization needs a more straightforward approach to evaluating product selection and handling, posing potential security risks.",
              0,
            ],
            [
              "We consider evaluated products but may also use EAL-based evaluations; we need to improve consistency in secure product handling and conduct occasional security assessments.",
              1,
            ],
            [
              "We prioritize evaluated products with PP-based evaluations, and we ensure their secure installation, configuration, and operation as per vendor guidance. We also conduct regular security assessments.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          num: 15,
          name: "5. System Development and Management: Secure System Lifecycle:",
          question:
            "How does your organization incorporate information security into the development lifecycle of information systems, covering areas like secure software design, secure programming practices, and software testing?",
          options: [
            [
              "We have no established security practices in our development lifecycle, and security is not considered during development.",
              0,
            ],
            [
              "Our development practices must be better structured for security, potentially leading to system vulnerabilities. We occasionally conduct security testing.",
              0,
            ],
            [
              "Our organization uses segregated environments but may benefit from enhanced threat modeling and security testing practices. We also have secure coding guidelines in place.",
              1,
            ],
            [
              "We maintain segregated development environments, conduct comprehensive threat modeling, apply secure programming practices, and perform thorough security testing before production deployment.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          num: 16,
          name: "5. System Development and Management: Secure System Lifecycle:",
          question:
            "How does your organization protect test data during system development, ensuring that production data is not inadvertently used in testing or development environments?",
          options: [
            [
              "We do not have any controls for managing test data, and production data is often used without any protection",
              0,
            ],
            [
              "Our approach to managing test data lacks proper controls, risking exposure of sensitive production data in development and testing. We use some data masking techniques.",
              0,
            ],
            [
              "We have some measures in place, but there might be room for improvement in securely managing test data and environments.",
              1,
            ],
            [
              "We ensure that production data is only used in testing or development environments if those environments are secured to the same level as production. We also use data anonymization techniques.",
              2,
            ],
          ],
          choosedOption: null,
        },
      ],
      essential6: [
        {
          num: 17,
          name: "6. Supplier Relationships and Compliance: Supplier management, incident response, continuity, and compliance:",
          question:
            "How does your organization ensure that supplier relationships are managed effectively to protect its assets, including assessing and mitigating supplier security risks, and do your contractual arrangements address data protection and security requirements?",
          options: [
            [
              "Our organization needs a systematic approach to supplier relationship management, leading to significant vulnerabilities in our supply chain, and our contractual arrangements need to address data protection and security requirements.",
              0,
            ],
            [
              "Our supplier relationship management needs a systematic approach to security risk assessment, potentially exposing our assets to vulnerabilities, and our contractual arrangements need to address security adequately.",
              0,
            ],
            [
              "While we assess supplier security risks, our processes have room for improvement, and our contractual arrangements are not consistently robust in addressing security requirements.",
              1,
            ],
            [
              "Our organization has a comprehensive supplier relationship management process that includes rigorous supplier risk assessments and strong contractual agreements addressing data protection and security requirements. ",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          num: 18,
          name: "6. Supplier Relationships and Compliance: Supplier management, incident response, continuity, and compliance:",
          question:
            "How does your organization monitor and review supplier service delivery to maintain an agreed level of information security and service quality, including regular audits, tracking changes to supplier services, and risk reassessment?",
          options: [
            [
              "Our organization must monitor or review supplier service delivery, leading to significant information security and quality issues. Managing changes to supplier services and risk reassessment are nonexistent.",
              0,
            ],
            [
              "We need more effective monitoring and review of supplier service delivery, which may lead to information security and service quality issues. Managing changes to supplier services and risk reassessment need to be better handled.",
              0,
            ],
            [
              "Our organization performs some monitoring and reviews. However, there is room for improvement, especially in managing changes to supplier services and risk reassessment.",
              1,
            ],
            [
              "We regularly monitor, review, and audit supplier service delivery, proactively manage changes to supplier services, and reassess risks to maintain information security and service quality.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          num: 19,
          name: "6. Supplier Relationships and Compliance: Supplier management, incident response, continuity, and compliance:",
          question:
            "How does your organization address compliance with legal, statutory, regulatory, and contractual requirements related to information security, including identifying and documenting applicable requirements, protecting records, and ensuring data sovereignty?",
          options: [
            [
              "Our organization needs to gain awareness of, or effort towards, compliance with legal, statutory, regulatory, or contractual requirements related to information security. We need more protection for records and data sovereignty.",
              0,
            ],
            [
              "Our organization needs help identifying and documenting relevant requirements, potentially leading to compliance issues. Records protection and data sovereignty need to be adequately addressed.",
              0,
            ],
            [
              "While we identify and document most requirements, there is room for improvement in tracking and ensuring compliance, especially regarding records protection and data sovereignty.",
              1,
            ],
            [
              "We have a robust system for identifying and documenting all relevant legal, statutory, regulatory, and contractual requirements related to information security. We protect records effectively and ensure data sovereignty in line with contractual obligations.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          num: 20,
          name: "6. Supplier Relationships and Compliance: Supplier management, incident response, continuity, and compliance:",
          question:
            "How does your organization conduct independent reviews of information security controls and policies, including periodic assessments of your approach to managing information security and its implementation, and do you maintain a strong focus on security policy adherence?",
          options: [
            [
              "Our organization needs an independent review of information security controls and policies, leading to numerous policy violations and weak security posture. Security policy adherence is nonexistent.",
              0,
            ],
            [
              "Our organization needs a systematic approach to independent reviews of information security controls and policies, potentially leading to policy violations. Adherence to security policies needs to be consistently enforced.",
              0,
            ],
            [
              "While we conduct independent reviews, there is room for improvement, especially in the frequency and depth of assessments. Adherence to security policies is generally maintained.",
              1,
            ],
            [
              "We conduct independent reviews of information security controls and policies, including periodic assessments of our approach to managing information security. Adherence to security policies is a top priority.",
              2,
            ],
          ],
          choosedOption: null,
        },
      ],
    }),
    []
  );

  const essentialData = {
    essential1: {
      description:
        "Policy and Governance are the cornerstone of an organization's information security strategy. They define how the organization approaches information security policies, employee suitability verification, and access management. These policies set the rules for secure behavior within the organization, ensuring the confidentiality, integrity, and availability of critical assets. In a rapidly evolving digital landscape, strong Policy and Governance practices are essential for risk mitigation, regulatory compliance, and data protection. They are the foundation of a resilient security posture and a strategic asset in today's threat landscape.",
      maturity0: {
        risks:
          "High Risk: In the realm of Policy and Governance, a high-risk status indicates that your organization faces significant vulnerabilities in terms of information security. The lack of formal information security policies, adequate employee suitability checks, and well-defined access controls exposes your organization to potential breaches and data compromises. Immediate action is imperative to address these gaps and ensure a robust security foundation. High-risk scenarios can lead to regulatory non-compliance, data breaches, and reputational damage, necessitating urgent and comprehensive improvements in policy and governance.",
      },
      maturity1: {
        risks:
          "Medium Risk: A medium-risk assessment in the Policy and Governance domain highlights areas where your organization's security measures are somewhat effective but could benefit from enhancements. This risk level is associated with the need for consistent policy updates, improved employee suitability verification, and the refinement of access controls. While not in immediate danger, there is room for improvement to fortify your organization's security posture. A medium-risk scenario may lead to operational disruptions or regulatory challenges if not addressed promptly.",
      },
      maturity2: {
        risks:
          "Low Risk: When assessed as a safe risk level, your Policy and Governance practices demonstrate a commendable commitment to information security. Well-defined policies, thorough employee suitability checks, and robust access controls ensure a solid foundation for safeguarding critical assets. Continuous updates and vigilance in these areas are key strengths, enabling your organization to maintain a safe and secure environment. This low-risk status provides confidence in your ability to protect sensitive information and maintain regulatory compliance.",
      },
    },
    essential2: {
      description:
        "Employee and contractor management is a critical aspect of an organization's information security strategy. It encompasses how your organization handles candidate suitability verification, employee awareness of security responsibilities, and information security responsibilities during employee termination or role changes. This area ensures that individuals within your organization are not only qualified but also aware of their role in maintaining information security. Effective employee and contractor management can significantly reduce security risks.",
      maturity0: {
        risks:
          "High Risk: In the realm of Human Resource Security - Employee and Contractor Management, a high-risk status indicates that your organization faces significant vulnerabilities in terms of employee and contractor management. Consistent verification checks, adequate awareness training, and clear information security responsibilities during transitions are essential but lacking. Failure to address these gaps can result in security breaches, unauthorized access, and potential data exposure. Immediate action is imperative to ensure robust employee and contractor management practices.",
      },
      maturity1: {
        risks:
          "Medium Risk: A medium-risk assessment in the Human Resource Security domain suggests that while some verification checks and awareness training are in place, there may be inconsistencies in enforcing information security responsibilities during transitions. The risk level indicates that improvements are necessary to ensure compliance with legal requirements and promote a culture of safe online behavior. Addressing these issues promptly is essential to maintain a secure work environment.",
      },
      maturity2: {
        risks:
          "Low Risk: A safe risk level in Human Resource Security - Employee and Contractor Management signifies that your organization is currently excelling in this area. Comprehensive background verification checks for candidates, thorough awareness training during employment, and guidance on safe online behavior are well-established practices. These measures contribute to a secure workforce, reduced insider threats, and a strong security culture.",
      },
    },
    essential3: {
      description:
        "Asset and Access Management is vital for safeguarding an organization's information and communication technology (ICT) equipment, controlling access, and ensuring data protection. It involves maintaining an ICT equipment register, implementing access controls, and classifying equipment based on data sensitivity. Effective asset and access management can mitigate security risks, prevent unauthorized access, and protect sensitive information.",
      maturity0: {
        risks:
          "High Risk: A high-risk assessment in Asset and Access Management indicates that your organization lacks an ICT equipment register and does not perform audits. This oversight can lead to unaccounted equipment, increased risks of unauthorized access, and a lack of visibility over ICT assets. Urgent action is required to establish and regularly audit the equipment register for enhanced security.",
      },
      maturity1: {
        risks:
          "Medium Risk: A medium-risk status suggests that your organization maintains an ICT equipment register but does not regularly audit it. This presents a risk of inaccuracies in the register and limited visibility into the status of ICT assets. Inconsistent audits may result in security gaps. Enhancing the audit frequency and accuracy is necessary to improve the overall security posture.",
      },
      maturity2: {
        risks:
          "Low Risk: A safe risk level in Asset and Access Management - Asset Responsibility and Access Control indicates that your organization maintains an ICT equipment register and regularly audits it. This practice ensures visibility over ICT assets and reduces the risk of unauthorized access. It also aligns ICT equipment classification with data sensitivity consistently. Additionally, your organization employs logon banners requiring users to acknowledge security responsibilities and seeks legal advice on their wording. Media management policies are in place, and regular audits of the removable media register are conducted, preventing unauthorized incidents.",
      },
    },
    essential4: {
      description:
        "The Integrated Information Security Framework is crucial for safeguarding an organization's information and information processing facilities. It covers a wide range of security measures, including preventing unauthorized physical access, damage, and interference, protecting equipment from loss, damage, theft, or compromise, securing ICT equipment and media when not in use, and ensuring the correct and secure operation of information processing facilities while protecting against malware. Effective protection, controls, and operations are essential to mitigate security risks and maintain uninterrupted business operations.",
      maturity0: {
        risks:
          "High Risk: A high-risk assessment within the Integrated Information Security Framework indicates that your organization's physical security measures are inadequate, leading to potential risks of unauthorized access, damage, and interference. Equipment protection practices are insufficient, resulting in frequent disruptions. Physical security of ICT equipment and media is lax, posing security risks to your organization. Operational procedures need better definition and documentation, and malware protection measures require revision. Urgent action is required to enhance the overall security posture.",
      },
      maturity1: {
        risks:
          "Medium Risk: A medium-risk status implies that your organization's security practices in several critical areas need improvement, leading to significant security risks. There is a need to improve physical security measures, equipment protection practices, and the security of ICT equipment and media. Additionally, operational security practices need to be enhanced, and malware protection measures require revisions to address potential risks and disruptions.",
      },
      maturity2: {
        risks:
          "Safe Risk: A safe risk level in the Integrated Information Security Framework suggests that your organization has robust security measures in place. This includes effective physical security measures, comprehensive equipment protection, strict ICT equipment and media security practices, well-defined operational procedures, and responsible malware protection measures. Security risks are rare, and business operations are secured.",
      },
    },
    essential5: {
      description:
        "The secure system lifecycle is paramount for ensuring the security of an organization's information systems. It encompasses a range of security measures, including the evaluation of product selection, handling throughout the lifecycle, secure software design, secure programming practices, software testing, and the protection of test data during system development. Adopting these practices helps mitigate security risks, reduce vulnerabilities, and protect sensitive data.",
      maturity0: {
        risks:
          "High Risk: A high-risk assessment in the System Development and Management domain indicates that your organization lacks security practices during the system development lifecycle. Systems may be vulnerable to various threats due to the absence of evaluated products, security assessment, and secure coding practices. Immediate action is imperative to enhance security measures and mitigate potential threats.",
      },
      maturity1: {
        risks:
          "Medium Risk: A medium-risk status suggests that your organization's security practices during system development may be lacking structure and consistency. This could lead to potential vulnerabilities in your systems, and security testing is only conducted occasionally. There is a need for improved security practices, threat modeling, and security testing to enhance the overall security posture.",
      },
      maturity2: {
        risks:
          "Safe Risk: A safe risk level in the System Development and Management domain implies that your organization has established secure practices throughout the system development lifecycle. You prioritize evaluated products, secure coding practices, and regular security assessments. Production data is meticulously protected during testing and development environments. These practices help maintain robust security throughout the system lifecycle, reducing vulnerabilities and protecting sensitive data.",
      },
    },
    essential6: {
      description:
        "Effective supplier relationship management, incident response, continuity, and compliance are essential for protecting an organization's assets. This section focuses on assessing and mitigating supplier security risks, addressing data protection and security requirements in contractual agreements, monitoring and reviewing supplier service delivery, maintaining information security and service quality, and addressing compliance with legal, statutory, regulatory, and contractual requirements related to information security. Furthermore, it examines conducting independent reviews of information security controls and policies while ensuring strong security policy adherence.",
      maturity0: {
        risks:
          "High Risk: A high-risk assessment in the Supplier Relationships and Compliance domain indicates that your organization's supplier relationship management is lacking a systematic approach, leading to significant vulnerabilities in the supply chain. Contractual arrangements do not adequately address data protection and security requirements. Monitoring and reviewing supplier service delivery is insufficient, resulting in information security and service quality issues. Compliance with legal, statutory, regulatory, and contractual requirements is not effectively addressed, potentially exposing your organization to compliance issues.",
      },
      maturity1: {
        risks:
          "Medium Risk: A medium-risk status suggests that your organization's supplier relationship management lacks a systematic approach to security risk assessment, potentially exposing assets to vulnerabilities. Contractual arrangements need to address security requirements more adequately. Monitoring and review of supplier service delivery require improvement, and there is room for managing changes to supplier services and risk reassessment. Compliance-related identification and documentation need enhancement, and records protection and data sovereignty must be addressed more effectively.",
      },
      maturity2: {
        risks:
          "Low Risk: A safe risk level in the Supplier Relationships and Compliance domain indicates that your organization has established a comprehensive supplier relationship management process, rigorous supplier risk assessments, and strong contractual agreements addressing data protection and security requirements. Monitoring, reviewing, and auditing supplier service delivery are conducted regularly, with proactive management of changes and risk reassessment. Your organization ensures compliance with all relevant legal, statutory, regulatory, and contractual requirements related to information security. Independent reviews of information security controls and policies are conducted periodically, with a strong focus on security policy adherence.",
      },
    },
  };

  const essentialNames = {
    essential1: "Policy and Governance",
    essential2: "Human Resource Security",
    essential3: "Asset and Access Management",
    essential4: "Integrated Information Security Framework",
    essential5: "System Development and Management",
    essential6: "Supplier Relationships and Compliance",
  };


  const [userResponses, setUserResponses] = useState({});
  const [currentEssential, setcurrentEssential] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [minMaturityLevels, setMinMaturityLevels] = useState({});

  function mapIntToRiskLevel(value) {
    switch (value) {
      case 0:
        return "High Risk";
      case 1:
        return "Medium Risk";
      case 2:
        return "Low Risk";
      default:
        return "unknown";
    }
  }
  const handleOptionChange = (selectedOption) => {
    // Find the current essential questions based on the current maturity level
    const currentEssentialQuestions = questionnaire[`essential${currentEssential}`];
    // Update the user's answer for the current question
    const updatedQuestions = currentEssentialQuestions.map((question, index) =>
      index === currentQuestion? { ...question, choosedOption: selectedOption }: question
    );
    // Find the question text for the current question
    const currentQuestionKey = updatedQuestions[currentQuestion].question;
    // Update the userResponses state with the integer value
    setUserResponses((prevResponses) => ({...prevResponses,[currentQuestionKey]: selectedOption,
    }));
    // Check if it's the last question of the current essential
    questionnaire[`essential${currentEssential}`][currentQuestion]["choosedOption"] = selectedOption;

    setMinMaturityLevels((prevMinLevels) => {
      const currentMinLevel = prevMinLevels[`essential${currentEssential}`];
      const newMinLevel =
        currentMinLevel !== undefined
          ? Math.round((parseInt(currentMinLevel) + parseInt(selectedOption)) / 2)
          : selectedOption;
      return {
        ...prevMinLevels,
        [`essential${currentEssential}`]: newMinLevel,
      };
    });

    if (currentQuestion === currentEssentialQuestions.length - 1) {
      setcurrentEssential((prevEssential) => prevEssential + 1);
      setCurrentQuestion(0);
    } else{
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };
  const currentEssentialQuestions = useMemo(() => questionnaire[`essential${currentEssential}`],[currentEssential, questionnaire]);
  const isQuestionnaireCompleted = !currentEssentialQuestions;


  const generatePDFReport = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [210, 297],
      compress: true,
      lineHeight: 1.2,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
    });
    let pageNumber = 3;
    const a4Width = 210; // Width of A4 in mm
    const a4Height = 297; // Height of A4 in mm
    const imagePath1 = "1-min.png";
    const imagePath2 = "2-min.png";
    const imagePath3 = "3-min.png";
    const logo = "Cyber Ethos Logo.png";
    const bg = "bg.png";
    // Calculate image dimensions to cover the full page
    const imageWidth = a4Width;
    const imageHeight = (a4Width * a4Height) / a4Width; // Maintain aspect ratio
    // Calculate the Y position to center the image vertically
    const imageY = (a4Height - imageHeight) / 2;
    const logoWidth = 53.17; // Adjust as needed
    const logoHeight = 23.82; // Adjust as needed
    const logoX = 10; // X-coordinate (in mm) for the left side margin
    const logoY = 10; // Y-coordinate (in mm) for the top margin
    const addPageNumber = () => {
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255); // Set text color to black
      doc.text(190, doc.internal.pageSize.height - 10, `Page ${pageNumber}`);
      pageNumber++; // Increment page number for the next page
    };
    // Add the image to the PDF
    doc.addImage(imagePath1, "PNG", 0, imageY, imageWidth, imageHeight);
    doc.addPage();
    doc.addImage(imagePath3, "PNG", 0, imageY, imageWidth, imageHeight);
    doc.addPage();
    doc.addImage(bg, "PNG", 0, imageY, imageWidth, imageHeight);
    doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
    addPageNumber();
    //printing title
    const titleFont = "bold Arial";
    const titleFontSize = 30;
    // const titleText = 'User Assessment Report';
    doc.setFont(titleFont);
    doc.setFontSize(titleFontSize);
    // Set the font color to yellow (RGB: 255, 255, 0)
    doc.setTextColor(251, 205, 50);
    let y = 20 + logoHeight;
    const maxWidth = doc.internal.pageSize.width - 35;
    const articleContent = `Our Unique Proposition (USP):
Cyber Ethos stands out with its practitioner-led approach and commitment to customers. Our USP revolves around three key pillars:
1) Holistic Cybersecurity Strategies, providing comprehensive programs aligned with business objectives;
2) Translating Complexity into Actionable Insights, making cybersecurity understandable and enabling informed risk decisions; and
3) Empowering Cybersecurity Awareness and Education, bridging the knowledge gap within organizations.

Services Offered:
Our range of cybersecurity services includes managed services for proactive monitoring and incident response, advisory and consulting for tailored guidance, board-level expertise to align cybersecurity with business objectives, audits to identify gaps and compliance requirements, and vulnerability scanning with penetration testing to assess and improve your Cyber posture.

Introduction:
In today's ever-evolving digital landscape, the security of your organization's sensitive information and critical assets holds paramount importance. As we embark on this journey of information security exploration, we are thrilled to present to you an evaluation of your ISO 27001 compliance based on our comprehensive assessment. Our analysis delves into the key facets that directly influence your information security posture. It provides a clear and non-technical insight into your organization's current state of information security preparedness from an ISO 27001 perspective. This report aims to empower your decision-making process by offering our assessment of your current state based on the ISO 27001 standard. We hope this will assist you in making informed decisions to strengthen your defenses and ensure a robust information security foundation.

Understanding ISO 27001:
ISO 27001, developed and published by the International Organization for Standardization (ISO), is a globally recognized standard for information security management systems (ISMS). This standard plays a pivotal role in enhancing an organization's information security resilience, regardless of its size or industry. ISO 27001 provides a structured framework for identifying, managing, and mitigating information security risks, safeguarding an organization's data, and ensuring the confidentiality, integrity, and availability of critical information assets. Compliance with ISO 27001 is a testament to an organization's commitment to securing its digital assets and sensitive information.

Conclusion:
With Cyber Ethos, businesses gain unparalleled cybersecurity expertise, customized strategies, and holistic solutions. Safeguard your data, secure your future, and gain a competitive edge. Contact us today by visiting our website www.cyberethos.com.au and/or by calling 1800 CETHOS (1800-238-467) and embark on a journey towards fortified cybersecurity and lasting success.
The following is an assessment of your current maturity level
based on your provided responses:
    `;
    let normalFontSize = 13;
    const largerFontSize = 18;
    const fontType = "helvetica";
    const articleLines = doc.splitTextToSize(articleContent, 390);
    let lineHeight = doc.getTextDimensions("M").h; // Use 'M' as a dummy character
    for (let i = 0; i < articleLines.length; i++) {
      const remainingPageSpace = doc.internal.pageSize.height - y;
      if (remainingPageSpace < lineHeight) {
        // Add a new page if remaining space is not enough for the next line
        doc.addPage();
        doc.addImage(bg, "PNG", 0, imageY, imageWidth, imageHeight);
        doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
        addPageNumber();
        y = 20 + logoHeight; // Reset y position for new page
      }
      if (
        articleLines[i].includes(
          "The following is an assessment of your current maturity level"
        )
      ) {
        doc.addPage();
        doc.addImage(bg, "PNG", 0, imageY, imageWidth, imageHeight);
        doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
        addPageNumber();
        y = 20 + logoHeight;
      }
      if (
        articleLines[i].includes("Introduction:") ||
        articleLines[i].includes("Understanding ISO 27001:") ||
        articleLines[i].includes("Our Unique Proposition (USP):") ||
        articleLines[i].includes("Services Offered:") ||
        articleLines[i].includes("Conclusion:") ||
        articleLines[i].includes("Seeking Assistance:") ||
        articleLines[i].includes(
          "The following is an assessment of your current maturity level"
        ) ||
        articleLines[i].includes("based on your provided responses:")
      ) {
        doc.setFont(fontType);
        doc.setFontSize(largerFontSize);
        doc.setTextColor(251, 205, 50);
      } else {
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(normalFontSize);
      }
      doc.text(14, y, articleLines[i]);
      y += lineHeight;
    }

    doc.setFont(fontType);
    doc.setFontSize(largerFontSize);
    doc.setTextColor(251, 205, 50);
    // Define the positions for user data
    const userDataX = 17;
    let userDataY = y + lineHeight - 5; // Adjust the vertical position as needed

    // Add user data to the PDF
    doc.setTextColor(251, 205, 50);
    doc.text("Name:", userDataX, userDataY);
    doc.setTextColor(255, 255, 255); 
    // doc.setFontSize(normalFontSize);
    doc.text(updatedData.name, userDataX + doc.getTextWidth("Name:") + 5, userDataY);
    
    userDataY += lineHeight + 3;
    
    doc.setFontSize(largerFontSize);
    doc.setTextColor(251, 205, 50); 
    doc.text("Company Name:", userDataX, userDataY);
    
    doc.setTextColor(255, 255, 255); // Set color for the user data (e.g., updatedData.companyName)
    // doc.setFontSize(normalFontSize);
    doc.text(updatedData.companyName, userDataX + doc.getTextWidth("Company Name:") + 5, userDataY);
    
    userDataY += lineHeight+ 3;
    
    doc.setFontSize(largerFontSize);
    doc.setTextColor(251, 205, 50);
    doc.text("Phone:", userDataX, userDataY);
    
    doc.setTextColor(255, 255, 255);
    // doc.setFontSize(normalFontSize);
    doc.text(updatedData.phoneNumber, userDataX + doc.getTextWidth("Phone:") + 5, userDataY);
    
    userDataY += lineHeight+ 3;
    
    doc.setFontSize(largerFontSize);
    doc.setTextColor(251, 205, 50);
    doc.text("Email: ", userDataX, userDataY);
    doc.setTextColor(255, 255, 255);
    // doc.setFontSize(normalFontSize);
    doc.text(updatedData.email, userDataX + doc.getTextWidth("Email:")+ 5, userDataY);
    


    

    //adding table
    const tableMarginTop = 10;
    const tableStartPosition = userDataY + 35 - tableMarginTop;
    const tableElement = document.querySelector("table");
    // const tableHeight = doc.autoTable.previous.finalY + tableMarginTop;
    const tableStyles = {
      theme: "grid", // Use the grid theme for better visibility
      headStyles: {
        fillColor: [33, 31, 31], // Column headers background color (blue)
        textColor: [251, 205, 50], // Column headers text color (white)
        lineColor: [255, 255, 255], // Border color (white)
      },
      styles: {
        fontSize: 12.5,
        cellPadding: 2,
        valign: "middle",
        halign: "center",
        fillColor: [33, 31, 31], // Table background color (black)
        textColor: [255, 255, 255], // Text color (white)
        lineColor: [255, 255, 255], // Border color (white)
      },
    };
    // Add the table to the PDF with formatting
    doc.autoTable({
      html: tableElement,
      startY: tableStartPosition,
      ...tableStyles,
    });
    doc.addPage();
    doc.addImage(bg, "PNG", 0, imageY, imageWidth, imageHeight);
    doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
    addPageNumber();
    y = 20 + logoHeight;

    let pageCounter = 0;
    Object.entries(minMaturityLevels).forEach(([essentialKey, response]) => {
      let maturityLevel = minMaturityLevels[essentialKey] || 0; 
      //let essentialName = essentialNames[essentialKey] || "";
      let essentialDescription = essentialData[essentialKey]?.description || "";
      let essentialRisks = essentialData[essentialKey][`maturity${maturityLevel}`]?.risks || "";
      // let improvementSteps = essentialData[essentialKey][`maturity${maturityLevel}`]?.steps || "";
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(normalFontSize);
      lineHeight = doc.getTextDimensions("M").h;
      console.log(maxWidth)
      console.log(lineHeight)
      let essentialDescriptionbr = doc.splitTextToSize(essentialDescription,maxWidth + 15);
      let essentialRisksbr = doc.splitTextToSize(essentialRisks, maxWidth + 15);
      // let improvementStepsbr = doc.splitTextToSize(improvementSteps,maxWidth + 15);

      let essentialDescriptionLines = essentialDescriptionbr.length * lineHeight;
      let essentialRisksLines = essentialRisksbr.length * lineHeight;
      // let improvementStepsLines = improvementStepsbr.length * lineHeight;
      let totalContentHeight = essentialDescriptionLines + essentialRisksLines;
      
      doc.setFont(fontType);
      doc.setFontSize(largerFontSize);
      doc.setTextColor(251, 205, 50);
      doc.text(`${essentialNames[essentialKey]}:`, 12, y);
      y += lineHeight + 5;
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(normalFontSize);
      doc.text(12, y, essentialDescriptionbr);
      y += essentialDescriptionLines + 15;
      
      doc.setFont(fontType);
      doc.setFontSize(largerFontSize);
      doc.setTextColor(251, 205, 50);
      doc.text("Risks Based on Current Security Level:", 12, y);
      y += lineHeight + 5;
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(normalFontSize);
      doc.text(12, y, essentialRisksbr);
      y += essentialRisksLines + 30;
      ++pageCounter;
      if (pageCounter%2 === 0 || y + totalContentHeight + 15 > doc.internal.pageSize.height) {
        doc.addPage();
        doc.addImage(bg, "PNG", 0, imageY, imageWidth, imageHeight);
        doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
        addPageNumber();
        y = 20 + logoHeight;
      }
    });
    lineHeight = doc.getTextDimensions("M").h;
    normalFontSize = 9;
    // lineHeight = doc.getTextDimensions("M").h;
    const disclaimerContent = `


Disclaimer: The Essential 8 maturity report provided herewith by Cyber Ethos is based solely on the responses provided by the end user. While our utmost diligence and expertise have been exercised in the creation of this report, it is important to acknowledge that the accuracy and completeness of the findings are contingent upon the accuracy and completeness of the user's responses. As such, Cyber Ethos cannot be held liable for any actions, decisions, or outcomes that may arise from the reliance on this report until a comprehensive and further assessment, conducted by our team, has been undertaken to align the findings with the specific needs and nuances of your organisation's cybersecurity requirements. We strongly recommend engaging us in a more detailed evaluation by our experts to ensure an accurate and tailored cybersecurity maturity assessment.`;
    const disclaimerLines = doc.splitTextToSize(disclaimerContent,maxWidth + 30);
    for (let i = 0; i < disclaimerLines.length; i++) {
      const remainingPageSpace = doc.internal.pageSize.height - y;
      if (remainingPageSpace < lineHeight) {
        doc.addPage();
        doc.addImage(bg, "PNG", 0, imageY, imageWidth, imageHeight);
        doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
        addPageNumber();
        y = 20 + logoHeight; // Reset y position for new page
      }
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(normalFontSize);
      doc.text(14, y, disclaimerLines[i]);
      y += lineHeight;
    }

    doc.addPage();
    doc.addImage(imagePath2, "PNG", 0, imageY, imageWidth, imageHeight);
    return doc.output("blob"); // Return the PDF content as a Blob
  };

  const handleDownloadPDF = () => {
    const pdfBlob = generatePDFReport();
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "user_report.pdf";
    link.click();
  };
  
  const navigate = useNavigate();
  useEffect(() => {
    if (isQuestionnaireCompleted) {
      // eslint-disable-next-line
      axios
        .post("https://formbackend-as4m.onrender.com/form/add", updatedData)
        .then((res) => {
          const addedData = res.data;
          console.log(`POST: user is added`, addedData);
        })
        .catch((err) => {
          console.error(err);
        });
      generatePDFReport();
    }
  });

  useEffect(() => {
    const newUpdatedData = props.userData;
    newUpdatedData["userResponses"] = userResponses;
    setUpdatedData(newUpdatedData);
    if(!(props.userData.name)){
      navigate('/');
    }
    // eslint-disable-next-line
  }, [props.userData, userResponses]);

  return (
    <div className={classes.App}>
      {isQuestionnaireCompleted ? (
        <div style={{ backgroundColor: "#211F1F" }}>
          <header className={classes.header}>
                <div className={classes['logo-container']}>
                    <img
                        src="/Cyber Ethos Logo.png"
                        alt="Cyber Ethos Logo"
                        width={319.02}
                        height={142.92}
                        className={classes.logo}
                    />
                </div>
            </header>
                    <p className={classes['logo-text']}>ISO27001 Assessment</p>
          <h1 style={{ color: "rgb(251, 205, 50)" }}>
            Congratulations! You have completed the assessment.
          </h1>
          <table style={{ border: "1px solid grey" }}>
            <thead>
              <tr>
                <th
                  style={{
                    backgroundColor: "#211F1F",
                    color: "rgb(251, 205, 50)",
                    border: "1px solid grey",
                  }}
                >
                  Sr. No.
                </th>
                <th
                  style={{
                    backgroundColor: "#211F1F",
                    color: "rgb(251, 205, 50)",
                    border: "1px solid grey",
                  }}
                >
                  ISO27001 Criteria{" "}
                </th>
                <th
                  style={{
                    backgroundColor: "#211F1F",
                    color: "rgb(251, 205, 50)",
                    border: "1px solid grey",
                  }}
                >
                  Risk Level (as per your responses)
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(minMaturityLevels).map((essentialKey, index) => (
                <tr key={essentialKey}>
                  <td
                    style={{
                      color: "rgb(255, 255, 255)",
                      border: "1px solid grey",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      color: "rgb(255, 255, 255)",
                      border: "1px solid grey",
                    }}
                  >
                    {essentialNames[essentialKey]}
                  </td>
                  <td
                      style={{
                        border: "1px solid grey",
                       // Add conditional background color based on risk level
                        color:
                          mapIntToRiskLevel(minMaturityLevels[essentialKey]) === "High Risk"
                          ? "red"
                          : mapIntToRiskLevel(minMaturityLevels[essentialKey]) === "Medium Risk"
                          ? "goldenrod"
                          : mapIntToRiskLevel(minMaturityLevels[essentialKey]) === "Low Risk"
                          ? "green"
                          : "",
                    }}
                    >
                    {mapIntToRiskLevel(minMaturityLevels[essentialKey])}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h4 style={{ color: "rgb(251, 205, 50)" }}>
              For complet assessment download the report:
            </h4>
            <button onClick={handleDownloadPDF}>Download PDF</button>
          </div>
          <div style={{ color: "rgb(251, 205, 50)", marginTop: "20px" }}>
          </div>
          <div style={{color: "rgb(251, 205, 50)"}} >
            <p>
              Phone: 1800 CEthos (1800 238 467) <br />
              Email: <a href="mailto:info@cyberethos.com.au" style={{ color: "rgb(255, 255, 255)" }}>info@cyberethos.com.au</a> <br />
              Facebook: <a href="https://www.fb.com/CyberEthos" style={{ color: "rgb(255, 255, 255)" }}>fb.com/CyberEthos</a> <br />
              LinkedIn: <a href="https://www.linkedin.com/company/CyberEthos" style={{ color: "rgb(255, 255, 255)" }}>linkedin.com/company/CyberEthos</a>
            </p>
            <p style={{ margin: "0", fontSize: "1.2em" }}>
              THANK YOU! WE LOOK FORWARD TO SERVING YOU.
            </p>
            <p className={classes['disclaimer-text']}>
              Disclaimer: The Essential 8 maturity report provided herewith by Cyber Ethos is based solely on the responses provided by the end user. While our utmost diligence and expertise have been exercised in the creation of this report, it is important to acknowledge that the accuracy and completeness of the findings are contingent upon the accuracy and completeness of the user's responses. As such, Cyber Ethos cannot be held liable for any actions, decisions, or outcomes that may arise from the reliance on this report until a comprehensive and further assessment, conducted by our team, has been undertaken to align the findings with the specific needs and nuances of your organization's cybersecurity requirements. We strongly recommend engaging us in a more detailed evaluation by our experts to ensure an accurate and tailored cybersecurity maturity assessment.
            </p>
          </div>
        </div>
      ) : (
        <>
          {currentEssentialQuestions &&
            currentEssentialQuestions.length > 0 && (
              <Question
                question={
                  questionnaire[`essential${currentEssential}`][currentQuestion]
                }
                onOptionChange={(selectedOption) =>
                  handleOptionChange(selectedOption)
                }
              />
            )}
        </>
      )}
    </div>
  );
};

export default Questionnere;
