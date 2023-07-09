package com.skillstorm.springaop.aspects;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;                // Simple Logging Facade for Java - abstraction for logging frameworks
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.skillstorm.springaop.models.Warehouse;

@Component
@Aspect             // tells AspectJ that this is an aspect
public class LoggingAspect {
    

    /*
     * Spring Boot provides configuration for:
     *      - Log4J2 (**** don't use version 1)
     *      - Logback
     *      - Java Util Logging
     * 
     *  Logback is included with the Spring Boot Starter dependencies
     * 
     * 
     * 
     * Logging Levels:
     *      fatal -> error -> warn -> info -> debug -> trace
     *      set this in application.yml
     */

    Logger log = LoggerFactory.getLogger(LoggingAspect.class);



    /*
     * ASPECTS
     *      Join Points - any place in your code that an aspect can insert itself
     *          like your classes and methods
     * 
     *      Point Cuts - defined in your aspect. specifies which join point to insert itself into
     * 
     *      Advice - thiss is what gets executed when the aspect inserts itself
     *          is going to tell the point how/when to interrupt
     */

    /*
     * 
     * options for defining point cut:
     *      within() - specify a package or class
     *      execution() - when a specific method executes
     *      bean() - for a specific bean
     */

    @Pointcut("within(com.skillstorm.springaop.controllers.ItemController)")   // any method in the MovieControlle class is now a pointcut
    public void checkItem() {
        /* leave empty - the code inside won't ever run */
    }

    // this wildcard means any return type
    @Pointcut("execution(public * saveWarehouse(com.skillstorm.springaop.models.Warehouse)) && args(warehouseToBeSaved)")  // allow for wildcards (*) use .. for multiple params of any type
    public void checkWarehouse(Warehouse warehouseToBeSaved) {

    }



    /*
     * Types of advice
     *      Before - advice runs before method execution
     *      After - advice runs after method execution
     *      AfterReturning - advice runs after method execution ONLY when it returns something
     *      AfterThrowing - advice runs after method execution ONLY when it throws an exception
     *      Around - all of the above
     */     

    @Before("checkItem()")
    public void request(JoinPoint joinpoint) {
        // JoinPoint will give you info about the method that you are advising

        log.debug("A request was made to {} with the argument(s): {}", 
            joinpoint.getSignature(), 
            Arrays.toString(joinpoint.getArgs()));

    }


    // can use AfterReturning to get the data that was returned by the method
    @AfterReturning(value = "checkItem()", returning = "returnedData")
    public void response(JoinPoint joinpoint, Object returnedData) {
        log.debug("A response was sent from {} with the returned data: {}",
            joinpoint.getSignature().getName(),
            returnedData.toString());
    }



    @Around("checkWarehouse(warehouseToBeSaved)")
    public Warehouse logWarehouses(ProceedingJoinPoint proceedingJoinPoint, Warehouse warehouseToBeSaved) {
        /*
         * PROCEEDING JOIN POINT
         *      join point that has an extra method: .proceed()
         *      
         *      aspect is going to interrupt a method and do something - then that method gets executed
         *      with a proceeding join point, it WILL NOT execute that method, unless you call .proceed()
         * 
         * 
         *      THESE ARE ONLY AVAILABLE ON AROUND ADVICE - errors on any other type of advice
         */


        log.debug("DIRECTOR: {}", warehouseToBeSaved.toString());

        /*
         * making a couple of assumptions:
         *      1. id will never be 0 in your database
         *      2. front end won't generate IDs for new records
         */
        if(warehouseToBeSaved.getId() == 0) {
            try {
                proceedingJoinPoint.proceed();
            } catch (Throwable e) {
                log.error("Method could not beexecuted.", e);
            }

            log.debug("WAREHOUSE WAS CREATED");
        }
        else {
            log.debug("WAREHOUSE WAS NOT CREATED - ALREADY EXISTS");
        }

        return warehouseToBeSaved;
    }


}
